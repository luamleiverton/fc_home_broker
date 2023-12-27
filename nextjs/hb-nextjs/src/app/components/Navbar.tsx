"use client"
import {Navbar} from "../components/flowbite-components";
import { usePathname, useParams } from "next/navigation";
import Link from "next/link";


export default function DefaultNavBar() {
  const pathname = usePathname();
  const params = useParams();
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="">
        <span className="self-center whitespace-nowrap text-xl font-semibold">FullCycle Invest</span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link
          active={pathname === `/${params.wallet_id}`} as={Link}
          href={`/${params.wallet_id}`}
        >
        Home
        </Navbar.Link>
        <Navbar.Link href="#">Ativos</Navbar.Link>
      </Navbar.Collapse>
      <div className="flex md:order-2">Olá {params.wallet_id}</div>
    </Navbar>
  );
}