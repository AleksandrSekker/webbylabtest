import {
  faDiscord,
  faGithub,
  faInstagram,
  faLinkedin,
  faTelegram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

export const links = [
  {
    link: "https://discordapp.com/users/613024264706064390",
    id: 1,
    icon: faDiscord,
  },
  {
    title: "telegram",
    link: "https://t.me/sekk_er",
    id: 2,
    icon: faTelegram,
  },
  {
    link: "https://www.instagram.com/sekk_er/",
    id: 2,
    icon: faInstagram,
  },
  {
    link: "https://twitter.com/AleksandrSekker",
    id: 3,
    icon: faTwitter,
  },
  {
    link: "https://www.linkedin.com/in/aleksandr-sekker-521352161/",
    id: 4,
    icon: faLinkedin,
  },
  {
    link: "https://github.com/AleksandrSekker",
    id: 5,
    icon: faGithub,
  }];

export const baseURL = process.env.NEXT_PUBLIC_API_URL;
