import Link from "next/link";

export default function Header() {
  const menuList = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About Us",
      link: "/about-us",
    },
    {
      name: "Contact Us",
      link: "/contact-us",
    },
  ];

  return (
    <nav className="py-4 px-14 border-b flex items-center justify-between">
      <Link href={"/"}>
        <img className="h-8" src="/logo.png" alt="Logo" />
      </Link>
      <div className="hidden md:flex gap-4 items-center font-semibold">
        {menuList?.map((item) => {
          return (
            <Link key={item?.name} href={item?.link}>
              <button>{item?.name}</button>
            </Link>
          );
        })}
      </div>
      <Link href={"/login"}>
        <button className="bg-blue-600 px-5 font-bold py-2 rounded-full items-center text-white">
          Login
        </button>
      </Link>
    </nav>
  );
}
