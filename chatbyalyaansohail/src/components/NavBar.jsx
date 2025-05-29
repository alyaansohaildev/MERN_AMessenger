'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div style={{padding: '20px 20px 0px 20px' }}>
      <nav style={{ display: 'flex', gap: '20px'}}>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/projects">Projects</Link>
      <Link href="/contact">Contact</Link>
      
      </nav>
      <div style={{height:"20px"}}/>
      <h1>Portfolio </h1>
      <h2>Alyaan Sohail</h2>
    </div>
    

  );
}