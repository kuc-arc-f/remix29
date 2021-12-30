import { useState, useEffect, useRef } from "react";
import type { MetaFunction, LoaderFunction } from "remix";
import { Form, json, useActionData, redirect } from "remix";
import { useLoaderData, Link } from "remix";
import { gql } from "@apollo/client";
import client from '../../apollo-client'
import Config from '../../config'
import LibCookie from '../lib/LibCookie'
import LibFlash from '../lib/LibFlash'

export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!"
  };
};

export default function Page() {
  console.log(Config);
  const keyUid = Config.COOKIE_KEY_USER_ID;
  // state
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [token, setToken] = useState("");
  
  useEffect(() => {
    (async() => {
      const data = await client.query({
        query: gql`
        query {
          getToken
        }      
        `,
        fetchPolicy: "network-only"
      });
  console.log(data.data.getToken);  
    setToken(data.data.getToken);  
    })()    
  },[])
  let onClick = async function(){
console.log("#onClick");
console.log(token);
    const mail = document.querySelector<HTMLInputElement>('#mail');
    const title = document.querySelector<HTMLInputElement>('#title');
    const body = document.querySelector<HTMLInputElement>('#body');
    let bodyText = body.value;
    bodyText = bodyText.replace(/\r?\n/g, '<br />');
console.log(bodyText);
    const result = await client.mutate({
      mutation:gql`
      mutation {
        sendMail(token: "${token}" ,
        to_mail: "${mail.value}"
        , title: "${title.value}", body: "${bodyText}")
      }                                  
    `
    });   
    console.log(result.data);
    if(result.data.sendMail !== 'OK'){
      setMessageError("Error, Send mail");
    }else{
      setMessage("Success, Send mail");
    }
/*
*/
  }  
  return (
    <div className="remix__page">
      { message ? 
      <div className="alert alert-success" role="alert">{message}</div> 
      : <div /> 
      }      
      { messageError ? 
      <div className="alert alert-danger" role="alert">{messageError}</div> 
      : <div /> }       
      <main>
        <h2>Mail Send</h2>
        <hr className="my-1" />
        <div className="col-sm-6">
          <label>
            <div>mail:</div>
            <input type="text" className="form-control" name="mail" id="mail" />
          </label>
        </div>
        <div className="col-sm-6">
          <label>
            <div>Title:</div>
            <input className="form-control" type="text" name="title" id="title" />
          </label>
        </div>
        <hr className="my-1" />
        <div className="col-sm-8">
          <label>
            <div>Body-Text:</div>
            <textarea className="form-control" rows={8} name="body" id="body"></textarea>
          </label>
        </div>        
        <hr className="my-1" />
        <button onClick={() => onClick()} className="btn btn-primary">Mail-Send
        </button>
        <hr />
        {/*
        */}
      </main>
    </div>
  );
}
