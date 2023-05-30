import Image from 'next/image';
import Link from 'next/link';
// import { useNavigation } from 'next/navigation';
import { ReactNode } from 'react';

export default function About() {
  return (
    <main>
      <header className="flex items-center justify-between">       
        <nav className="navbar flex">
            <ul className="navbar-list flex gap-4 text-xl ">
                <NavItem href="/" activePath="/">Home</NavItem>
                <NavItem href="/about" activePath="/about">About</NavItem>
                <NavItem href="/commands" activePath="/commands">Commands</NavItem>
                <NavItem href="/support" activePath="/support">Support</NavItem>
            </ul>
        </nav>
        <Image
          src="/SmallStar.png"
          alt="Header Image"
          width={150}
          height={36}
        />
      </header>
      <hr />
      <section>
      <h1 className="text-4xl m-4">About</h1>
        <Image
          src="/FullLogo.png"
          alt="Main Image"
          width={300}
          height={150}
        />
        <div className="flex flex-col gap-4">
          <article>
            <h2>Article 1</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum eum necessitatibus odit, fuga error ab fugiat sapiente unde harum optio aspernatur alias beatae tempora corporis molestiae enim rem vero! Magni!</p>
            <button>
              <a href="/">Button 1</a>
            </button>
          </article>
          <article>
            <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores aspernatur qui officia similique adipisci placeat suscipit minus optio assumenda laboriosam impedit explicabo atque, odio, animi magnam corporis reprehenderit exercitationem quod!</h2>
            <p>Content of Article 2</p>
            <button>
              <a href="/">Button 2</a>
            </button>
          </article>
          {/* Add more articles here */}
        </div>
      </section>
      <footer>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="/"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/SmallStar.png"
              alt="Vercel Logo"
              width={150}
              height={36}
              priority
            />
          </a>
        </div>
      </footer>
    </main>
  );
}

function NavItem({ href, activePath, children }: { href: string, activePath: string, children: ReactNode }) {
  const isActive = href === activePath;

  return (
    <li className={`navbar-item m-0 ${isActive ? 'underline-animation' : ''}`}>
      <Link href={href} as="a" passHref>
      </Link>
    </li>
  );
}