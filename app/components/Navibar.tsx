import {
  Link,
} from "remix";
//
export default function Navibar(){
  return (
    <div className="py-2">
      <Link to="/" className="fs-5 mx-2">[ Home ]
      </Link>
      <Link to="/about">[ about ]</Link>
      <hr />
    </div>
  );
}
