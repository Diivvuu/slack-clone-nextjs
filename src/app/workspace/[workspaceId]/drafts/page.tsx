import { FaGithub } from "react-icons/fa";

const DraftsPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-y-2">
      <div>
        <a target="_blank"  href="https://github.com/Diivvuu/slack-clone-nextjs">
          <FaGithub className="size-10" />
        </a>
      </div>
      <div className="font-semibold">Wanna contribute to this feature?</div>
      <div className="font-semibold text-xl">
        I am bringing something interesting here!
      </div>
    </div>
  );
};

export default DraftsPage;
