import Link from "next/link";

export default function NotFound() {
  return <main id="main" className="not-found container"><span className="eyebrow">VANTA / 404</span><h1>Address not found.</h1><p>This route is not in the atlas.</p><Link className="btn btn-blue" href="/en">Return home <span aria-hidden="true">↗</span></Link></main>;
}
