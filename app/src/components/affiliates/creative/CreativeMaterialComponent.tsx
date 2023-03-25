import {
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    useDisclosure,
} from "@chakra-ui/react";
import {
    AddIcon,
} from "@chakra-ui/icons";
interface Props {
    values: valueProps[];
    file?: string;
    alt: string;
    url: string;
}

interface valueProps {
    title: string;
    value: string | undefined;
}

export const CreativeMaterialComponent = ({ values, file, alt, url }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <div className=" rounded-xl bg-white p-4 shadow mb-5">
            <div className="flex mt-4 items-start">
                <div className="rounded-xl w-32 md:w-96">
                    <Image src="/img/CreativeMaterial1.png" className="rounded-xl bg-cover" alt={alt} />
                </div>
                <div className="rounded-xl ml-5 w-full">
                    <div className=" bg-[#F5F8FA] py-4 md:px-8 px-4">
                        <div className="md:flex justify-between">
                            <div className="">
                                <div className=" font-medium text-sm text-[#717171]">{values[0]?.title}</div>
                                <div className="md:mt-3 font-medium text-sm md:text-lg">{values[0]?.value}</div>
                            </div>
                            <div className="md:block flex justify-between mt-2">
                                <div>
                                    <div className=" font-medium text-sm text-[#717171]">{values[1]?.title}</div>
                                    <div className="md:mt-3 font-medium text-sm md:text-lg">{values[1]?.value}</div>
                                </div>
                                <div className="md:hidden">
                                    <div className=" font-medium text-sm text-[#717171]">{values[2]?.title}</div>
                                    <div className=" text-sm md:text-lg text-[#353535]">{values[2]?.value}</div>
                                </div>
                            </div>
                        </div>
                        <div className="md:flex justify-between pt-1 md:pt-12 ">
                            <div className="hidden md:block mt-2">
                                <div className=" font-medium text-sm text-[#717171]">{values[2]?.title}</div>
                                <div className=" text-sm md:text-lg text-[#353535]">{values[2]?.value}</div>
                            </div>
                            <div className="mt-2">
                                <div className=" font-medium text-sm text-[#717171]">{values[3]?.title}</div>
                                <div className=" text-sm md:text-lg text-[#353535]">{values[3]?.value}</div>
                            </div>
                            <div className="md:block flex justify-between mt-2">
                                <div>
                                    <div className=" font-medium text-sm text-[#717171]">{values[4]?.title}</div>
                                    <div className=" text-sm md:text-lg text-[#353535]">{values[4]?.value}</div>
                                </div>
                                <div className="md:hidden">
                                    <div className=" font-medium text-sm text-[#717171]">Language</div>
                                    <div className=" text-sm md:text-lg text-[#353535]">English</div>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <div className=" font-medium text-sm text-[#717171]">Language</div>
                                <div className=" text-sm md:text-lg text-[#353535]">English</div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-1 md:mt-3 lg:flex justify-between items-end hidden md:block">
                        <div className="">
                            <div className='text-xs font-medium text-[#525252] mb-1 ml-2'>Click URL</div>
                            <div className="bg-[#F9F9FF] lg:w-96 py-2 px-3 border-[#D7D7D7] border rounded text-[#666666] font-medium text-sm">
                                {url}
                            </div>
                        </div>
                        <div className="flex justify-center md:justify-end items-end mt-5">
                            <div className="">
                                <div className="">
                                    <button className="flex px-4 border-[#282560]  duration-300 bg-[#1B48BB]  md:px-6 text-base  text-white font-medium  py-2 rounded-md ">
                                        <div className="text-white">Copy Click Url</div>
                                        <div className="items-center ml-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M20 2H8C6.897 2 6 2.897 6 4V16C6 17.103 6.897 18 8 18H20C21.103 18 22 17.103 22 16V4C22 2.897 21.103 2 20 2ZM8 16V4H20L20.002 16H8Z" fill="white" />
                                                <path d="M4 8H2V20C2 21.103 2.897 22 4 22H16V20H4V8Z" fill="white" />
                                            </svg>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <div className="ml-2">
                                <div className="">
                                    <button onClick={onOpen} className="flex px-4 py-2 justify-center duration-300 bg-[#EFEEFF] border border-solid border-[#282560]  text-base  text-[#282560] font-medium   rounded-md">
                                        <div>Get HTML Code</div>
                                        <div className="items-center ml-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 22 22" fill="none">
                                                <path d="M5.37498 14.781L6.62498 13.219L2.60098 9.99998L6.62498 6.78098L5.37498 5.21898L0.374981 9.21898C0.257826 9.31267 0.163249 9.4315 0.098254 9.5667C0.033259 9.70189 -0.000488281 9.84998 -0.000488281 9.99998C-0.000488281 10.15 0.033259 10.2981 0.098254 10.4333C0.163249 10.5685 0.257826 10.6873 0.374981 10.781L5.37498 14.781ZM14.625 5.21898L13.375 6.78098L17.399 9.99998L13.375 13.219L14.625 14.781L19.625 10.781C19.7421 10.6873 19.8367 10.5685 19.9017 10.4333C19.9667 10.2981 20.0005 10.15 20.0005 9.99998C20.0005 9.84998 19.9667 9.70189 19.9017 9.5667C19.8367 9.4315 19.7421 9.31267 19.625 9.21898L14.625 5.21898ZM12.976 1.21598L8.97598 19.216L7.02298 18.782L11.023 0.781982L12.976 1.21598Z" fill="#282560" />
                                            </svg>
                                        </div>
                                    </button>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal isOpen={isOpen} size="3xl" onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent ml={4} mr={4}>
                        <div className="flex pl-5  md:pl-6 pt-4 justify-between items-end">
                            <div className=" text-[#282560] text-xl font-medium">
                                HTML Code
                            </div>
                            <Image
                                alt="..."
                                className="mr-4 w-10 h-10 rounded-full align-middle "
                                src="/img/icons/close.png"
                                onClick={onClose}
                            />
                        </div>
                        <ModalBody>
                            <form className="w-full pt-5">
                                <div className="md:flex justify-between md:space-x-4 mb-6">
                                    <div className="w-full md:w-1/2 mb-3">
                                        <label
                                            className="pl-3 block  tracking-wide text-[#525252] text-sm font-medium mb-2"
                                            htmlFor="grid-first-name"
                                        >
                                            Profile
                                        </label>
                                        <div className="flex">
                                            <div className=" flex items-center relative w-full ">
                                                <select
                                                    className="px-4 py-3 w-3/4 flex  items-center border rounded border-[#D7D7D7] bg-[#FFFFFF]  cursor-pointer text-xs" >
                                                    <option value="Account 1">Account 1</option>
                                                    <option value="Account 2">Account 2</option>
                                                    <option value="Account 3">Account 3</option>
                                                    <option value="account 4">Account 4</option>
                                                </select>
                                                <button
                                                    className="ml-2 py-3 px-4 rounded-md bg-[#2262C6] text-center text-white font-medium text-sm">
                                                    <AddIcon />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/2">
                                        <label
                                            className="block pl-3 tracking-wide text-[#525252] text-sm font-medium mb-2"
                                            htmlFor="grid-first-name"
                                        >
                                            Dynamic Parameter
                                        </label>
                                        <div className="flex">
                                            <div className=" flex items-center relative w-full ">
                                                <select
                                                    className="px-4 py-3 w-3/4 flex  items-center border rounded border-[#D7D7D7] bg-[#FFFFFF]  cursor-pointer text-xs" >
                                                    <option value="Account 1">Account 1</option>
                                                    <option value="Account 2">Account 2</option>
                                                    <option value="Account 3">Account 3</option>
                                                    <option value="account 4">Account 4</option>
                                                </select>
                                                <button
                                                    className="ml-2 py-3 px-4 rounded-md bg-[#2262C6] text-center text-white font-medium text-sm">
                                                    <AddIcon />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <textarea
                                            className="w-full bg-[#F0F9FF] text-[#1B48BB] border border-#D7D7D7 rounded-3xl py-3 px-4 mb-3 h-48 font-medium text-base" value='<div class="container"> 
                                                        <img src="img_5terre_wide.jpg" alt="Cinque Terre" width="1000" height="300">
                                                        <div class="topleft">Top Left</div>
                                                      </div>'
                                            id="grid-textarea"
                                        />
                                    </div>
                                </div>
                            </form>
                        </ModalBody>
                        <div className="pl-8 pb-6 px-2 md:flex justify-between">
                            <div className="flex justify-between md:block">
                                <div className="rounded ">
                                    <button className="rounded px-6 py-2.5 bg-[#1B48BB] text-white border-[#282560] text-xs  duration-300">Get Code</button>
                                </div>
                                <div className="rounded md:hidden">
                                    <button className="flex justify-center items-center rounded px-6 py-2.5 bg-[#1B48BB] text-white border-[#282560] text-xs duration-300">
                                        <div className="text-white">Copy Click Url</div>
                                        <div className="ml-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none">
                                                <path d="M20 2H8C6.897 2 6 2.897 6 4V16C6 17.103 6.897 18 8 18H20C21.103 18 22 17.103 22 16V4C22 2.897 21.103 2 20 2ZM8 16V4H20L20.002 16H8Z" fill="white" />
                                                <path d="M4 8H2V20C2 21.103 2.897 22 4 22H16V20H4V8Z" fill="white" />
                                            </svg></div>
                                    </button>
                                </div>
                            </div>
                            <div className="flex md:space-x-2 justify-between md:justify-center mt-2">
                                <div className="hidden md:block rounded">
                                    <div className="rounded">
                                        <button className="flex justify-center items-center rounded px-6 py-2.5 bg-[#1B48BB] text-white border-[#282560] text-xs duration-300">
                                            <div className="text-white">Copy Click Url</div>
                                            <div className="ml-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none">
                                                    <path d="M20 2H8C6.897 2 6 2.897 6 4V16C6 17.103 6.897 18 8 18H20C21.103 18 22 17.103 22 16V4C22 2.897 21.103 2 20 2ZM8 16V4H20L20.002 16H8Z" fill="white" />
                                                    <path d="M4 8H2V20C2 21.103 2.897 22 4 22H16V20H4V8Z" fill="white" />
                                                </svg></div>
                                        </button>
                                    </div>
                                </div>
                                <div className=" rounded">
                                    <div className="">
                                        <button className="flex justify-center rounded px-6 py-2.5 bg-[#1B48BB] text-white border-[#282560] text-xs duration-300">Get HTML Code
                                        </button>

                                    </div>
                                </div>

                                <div className=" rounded">
                                    <div className="">
                                        <button className="flex justify-center items-center rounded px-6 py-2.5 bg-[#1B48BB] text-white border-[#282560] text-xs duration-300">
                                            <div className="text-white">Download Image</div>
                                            <div className="ml-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5938 0H1.40625C1.03329 0 0.675604 0.148158 0.411881 0.411881C0.148158 0.675604 0 1.03329 0 1.40625L0 13.5938C0 13.9667 0.148158 14.3244 0.411881 14.5881C0.675604 14.8518 1.03329 15 1.40625 15H13.5938C13.9667 15 14.3244 14.8518 14.5881 14.5881C14.8518 14.3244 15 13.9667 15 13.5938V1.40625C15 1.03329 14.8518 0.675604 14.5881 0.411881C14.3244 0.148158 13.9667 0 13.5938 0ZM14.0625 9.1825L12.0512 7.17188C11.9634 7.08467 11.8447 7.03572 11.7209 7.03572C11.5972 7.03572 11.4784 7.08467 11.3906 7.17188L8.90625 9.65125L5.9575 6.70312C5.86969 6.61592 5.75095 6.56697 5.62719 6.56697C5.50343 6.56697 5.38469 6.61592 5.29688 6.70312L0.9375 11.0575V1.40625C0.9375 1.28193 0.986886 1.1627 1.07479 1.07479C1.1627 0.986886 1.28193 0.9375 1.40625 0.9375H13.5938C13.7181 0.9375 13.8373 0.986886 13.9252 1.07479C14.0131 1.1627 14.0625 1.28193 14.0625 1.40625V9.1825Z" fill="white" />
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalContent>
                </Modal>
            </div >
            <div className="mt-1 md:mt-3 items-end md:hidden">
                <div className="">
                    <div className='text-xs font-medium text-[#525252] mb-1 ml-2'>Click URL</div>
                    <div className="bg-[#F9F9FF] lg:w-96 py-2 px-3 border-[#D7D7D7] border rounded text-[#666666] font-medium text-sm">
                        {url}
                    </div>
                </div>
                <div className="flex justify-center md:justify-end items-end mt-5">
                    <div className="">
                        <div className="">
                            <button className="flex px-4 border-[#282560]  duration-300 bg-[#1B48BB]  md:px-6 text-base  text-white font-medium  py-2 rounded-md ">
                                <div className="text-white">Copy Click Url</div>
                                <div className="items-center ml-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M20 2H8C6.897 2 6 2.897 6 4V16C6 17.103 6.897 18 8 18H20C21.103 18 22 17.103 22 16V4C22 2.897 21.103 2 20 2ZM8 16V4H20L20.002 16H8Z" fill="white" />
                                        <path d="M4 8H2V20C2 21.103 2.897 22 4 22H16V20H4V8Z" fill="white" />
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="ml-2">
                        <div className="">
                            <button onClick={onOpen} className="flex px-4 py-2 justify-center duration-300 bg-[#EFEEFF] border border-solid border-[#282560]  text-base  text-[#282560] font-medium   rounded-md">
                                <div>Get HTML Code</div>
                                <div className="items-center ml-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 22 22" fill="none">
                                        <path d="M5.37498 14.781L6.62498 13.219L2.60098 9.99998L6.62498 6.78098L5.37498 5.21898L0.374981 9.21898C0.257826 9.31267 0.163249 9.4315 0.098254 9.5667C0.033259 9.70189 -0.000488281 9.84998 -0.000488281 9.99998C-0.000488281 10.15 0.033259 10.2981 0.098254 10.4333C0.163249 10.5685 0.257826 10.6873 0.374981 10.781L5.37498 14.781ZM14.625 5.21898L13.375 6.78098L17.399 9.99998L13.375 13.219L14.625 14.781L19.625 10.781C19.7421 10.6873 19.8367 10.5685 19.9017 10.4333C19.9667 10.2981 20.0005 10.15 20.0005 9.99998C20.0005 9.84998 19.9667 9.70189 19.9017 9.5667C19.8367 9.4315 19.7421 9.31267 19.625 9.21898L14.625 5.21898ZM12.976 1.21598L8.97598 19.216L7.02298 18.782L11.023 0.781982L12.976 1.21598Z" fill="#282560" />
                                    </svg>
                                </div>
                            </button>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}