import { Image } from "@chakra-ui/react";

const AuthenticationFooter = () => {
  return (
    <footer className="flex rounded-lg bg-white p-4 pt-12 pb-6 font-['Inter'] font-normal md:px-6 md:pt-24">
      <span className="mt-1 block text-xs sm:text-center">
        Power by&nbsp;
        <a href="" className="text-xs text-[#2262C6] underline">
          Affliatets.com
        </a>
      </span>
      <Image className="ml-1 h-5" src="/img/logo.png" width="15" alt="logo" />
    </footer>
  );
};

export default AuthenticationFooter;
