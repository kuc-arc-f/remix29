import React, {useState, useEffect, useRef} from 'react';
import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";
import LibFlash from '../lib/LibFlash'

type IndexData = {
  resources: Array<{ name: string; url: string }>;
  demos: Array<{ name: string; to: string }>;
};

export let loader: LoaderFunction = () => {
  let data: any = {}
  return json(data);
};

export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!"
  };
};

export default function Index() {
  let data = useLoaderData<IndexData>();
  //state
  const [message, setMessage] = useState("");
  useEffect(() => {
    const msg: any = LibFlash.getMessageObject();
    setMessage(msg.success);
    console.log(msg);    
  },[]);  

  return (
    <div className="remix__page">
      { message ? 
      <div className="alert alert-success" role="alert">{message}</div> 
      : <div /> 
      }       
      <main>
        <h2>welcome, Top</h2>
        <hr />
      </main>
    </div>
  );
}
