import React from "react";
import { BsFacebook, BsGithub, BsWhatsapp } from 'react-icons/bs';
import { AiFillInstagram } from 'react-icons/ai';

type SocialMedia = {
  key: 'fb' | 'ig' | 'wa' | 'gh',
  url: string,
  name: 'Facebook' | 'Instagram' | 'Whatsapp' | 'Github'
}

type propTypes = {
  name: string,
  role: string,
  children: React.ReactNode,
  imageUrl: string,
  socialMedia: SocialMedia[]
}

const socialMediaIcons = {
  'fb': <BsFacebook fontSize={22} />,
  'ig': <AiFillInstagram fontSize={22} />,
  'wa': <BsWhatsapp fontSize={22} />,
  'gh': <BsGithub fontSize={22} />,
}

function CardTeam({ name, role, children, imageUrl, socialMedia }: propTypes) {
  return (
    <div className="px-6 sm:px-12 py-8 transition-colors duration-300 transform border cursor-pointer rounded-xl group hover:bg-sky-600 border-gray-700 hover:border-transparent">
      <div className="flex flex-col sm:-mx-4 sm:flex-row">
        <img
          className="flex-shrink-0 object-cover w-24 h-24 rounded-full sm:mx-4 ring-4 ring-gray-300"
          src={imageUrl}
          alt={`${name.split(' ')[0]}-profile`}
        />
        <div className="mt-4 sm:mx-4 sm:mt-0">
          <h1 className="text-xl font-semibold text-white capitalize md:text-2xl group-hover:text-white">
            {name}
          </h1>
          <p className="sm:mt-2 capitalize text-gray-300 group-hover:text-gray-300">
            {role}
          </p>
        </div>
      </div>
      <p className="mt-4 text-gray-300 capitalize group-hover:text-gray-300">
        {children}
      </p>
      <div className="flex mt-4 -mx-2">
        {socialMedia.map((social) => (
          <a
            key={social.key}
            href={social.url}
            className="mx-2 text-gray-300 hover:text-gray-300 group-hover:text-white"
            aria-label={social.name}
            rel="noopener noreferrer"
            target="_blank"
          >
            {socialMediaIcons[social.key]}
          </a>
        ))}
      </div>
    </div>
  )
}

export default CardTeam;
