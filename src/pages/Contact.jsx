import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
export const Contact = () => {
  return (
    <div className="grid grid-col-2 grid-rows-2 gap-4 mb-4">
      <div className="mail bg-zinc-900 rounded-xl w-40 md:w-56 flex justify-center items-center row-start-2  md:row-start-1">
        <a
          target="_blank"
          href="mailto:adityabhatkar23@gmail.com"
          className="px-2 py-1 bg-zinc-700 rounded-lg flex gap-2 items-center justify-center text-center"
        >
          <FaEnvelope />
          <span className="text-xs text-center tracking-wider">
            me@aditya.dev
          </span>
        </a>
      </div>

      <div className="bg-zinc-900 rounded-xl w-auto h-36 md:h-auto md:w-56 flex flex-col justify-center items-center github col-span-2 md:row-start-2 md:col-start-1 ">
        <a
          target="_blank"
          href="https://github.com/adityabhatkar23/"
          className="text-3xl"
        >
          <FaGithub />
        </a>
        <h1 className="font-semibold text-xl">Github Profile</h1>
        <p className="text-sm text-zinc-400 font-medium">
          Find more of my repositories
        </p>
      </div>

      <div className="bg-zinc-900 rounded-xl md:h-64 w-40 md:w-56 flex justify-center items-center linkedin md:col-start-2 md:row-span-2 md:row-start-1">
        <a
          target="_blank"
          href="https://linkedin.com/in/aditya-bhatkar-8555122a3/"
          className="text-4xl"
        >
          <FaLinkedin />
        </a>
      </div>

      <div className="form col-span-2 mt-4 contact-form">
        <h1 className="font-bold text-2xl">Contact with me</h1>

        <p className="text-sm text-zinc-400  font-thin my-2 mb-3 ">
          You can also get in touch with me through the form below
        </p>

        <form
          action="https://api.web3forms.com/submit"
          method="POST"
          className="flex flex-col gap-3"
        >
          <input
            type="hidden"
            name="access_key"
            value="b1479364-bb59-4330-b8ff-91f224e0600d"
          />
          <div className="flex-col flex p-2 bg-zinc-900 rounded-lg ">
            <label
              htmlFor="name"
              className="text-[11px] font-medium text-zinc-200 tracking-wider"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className=" outline-none text-xs placeholder:text-xs bg-transparent"
              placeholder="Your name"
            />
          </div>
          <div className="flex-col flex p-2 bg-zinc-900 rounded-lg ">
            <label
              htmlFor="email"
              className="text-[11px] font-medium text-zinc-200 tracking-wider"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className=" outline-none text-xs placeholder:text-xs bg-transparent"
              placeholder="example@mail.com"
            />
          </div>
          <div className="flex-col flex p-2 bg-zinc-900 rounded-lg ">
            <label
              htmlFor="message"
              className="text-[11px] font-medium text-zinc-200 tracking-wider"
            >
              Name
            </label>
            <textarea
              rows="3"
              name="message"
              id="message"
              className=" outline-none text-xs resize-none placeholder:text-xs bg-transparent"
              placeholder="Enter your message here"
            ></textarea>
          </div>

          <input
            type="submit"
            name="submit"
            id="submit"
            className=" outline-none text-[13px] font-medium text-center p-2 bg-zinc-700 rounded-lg text-zinc-200 "
            value="Send Message"
          />
        </form>
      </div>
    </div>
  );
};
