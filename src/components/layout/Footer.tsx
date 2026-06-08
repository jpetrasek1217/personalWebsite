import { FaEnvelope, FaLinkedinIn, FaGithub, FaItchIo } from 'react-icons/fa';

const SOCIALS = [
  {
    label: 'Email',
    href: 'mailto:josephpetrasek1017@gmail.com',
    icon: FaEnvelope,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/josephpetrasek',
    icon: FaLinkedinIn,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/jpetrasek1217',
    icon: FaGithub,
  },
  {
    label: 'itch.io',
    href: 'https://brotherbroseph.itch.io',
    icon: FaItchIo,
  },
];

export default function Footer() {
  return (
    <footer
      id='footer'
      className='bg-dark flex justify-center items-center gap-8 py-8 mt-16'>
      {SOCIALS.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('mailto') ? undefined : '_blank'}
          rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
          aria-label={label}
          className='text-accent hover:text-light active:scale-110 transition-all duration-200 text-2xl'>
          <Icon />
        </a>
      ))}
    </footer>
  );
}
