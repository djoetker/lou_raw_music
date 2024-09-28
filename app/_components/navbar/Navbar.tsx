import Link from "next/link"

export default function Navbar() {

  return (
    <header className="flex items-end justify-between p-0 text-black pt-3">
      <h1 className="text-2xl font-bold">LOU RAW</h1>
      <nav>
        <ul className="flex space-x-4">
          <Link href="/">
            <p>HOME</p>
          </Link>
          <Link href="/music">
            <p>MUSIC</p>
          </Link>
        </ul>
      </nav>
    </header>
  )
}