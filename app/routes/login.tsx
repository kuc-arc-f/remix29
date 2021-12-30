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
    const password = document.querySelector<HTMLInputElement>('#password');
    const result = await client.query({
      query: gql`
      query {
        userValid(token: "${token}",
        email: "${mail.value}", password: "${password.value}") {
          id
        }
      }       
      `,
      fetchPolicy: "network-only"
    });    
console.log(result);
    const key = Config.COOKIE_KEY_USER_ID;
    if(result.data.userValid !== null){
      const uid = result.data.userValid.id;
      console.log("uid=", uid);
      LibCookie.set_cookie(key, uid);
      LibFlash.setMessage("Success, login");
      setMessage("Success, login");
//      alert("Success, login");
      location.href = '/';
    }else{
      LibFlash.setError("Error, login");
      setMessageError("Error, login");
//      alert("Error, login");
    }
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
        <h2>Login</h2>
        <hr />
        <div className="col-sm-6">
          <label>
            <div>mail:</div>
            <input type="text" className="form-control" name="mail" id="mail" />
          </label>
        </div>
        <div className="col-sm-6">
          <label>
            <div>password:</div>
            <input className="form-control" type="password" name="password" id="password" />
          </label>
        </div>
        <hr />
        <button onClick={() => onClick()} className="btn btn-primary">Login
        </button>
        <hr />
        <Link to="/users/create" className="btn btn-outline-primary">Register
        </Link>
        {/*
        */}
      </main>
    </div>
  );
}
