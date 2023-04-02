import Link from "next/link";
import { Button } from "../../ui/button";

interface Props {
    first_name: string | undefined;
    last_name: string | undefined;
    mail: string | undefined;
}

const AccountManager = ({first_name, last_name, mail}:Props) => {

    return (

        <div className="rounded-2xl bg-white px-2 py-5 shadow-sm md:px-5">
            <div className="mb-3 text-xl font-bold text-[#2262C6]">
                Your Account Manager
            </div>
            <div className="align-center align-center mb-2 flex justify-center">
                <img width="100" src="/img/icons/user.png" alt="worldmap" />
            </div>
            <div className="align-center mb-5 text-center text-base">
                <div className="font-bold text-black">
                    {" "}
                    {first_name} {last_name}{" "}
                </div>
                <div className="text-[#717579]">Project Manager</div>
            </div>
            <div className="px-4 rounded-2xl bg-[#F4F7F9] py-5 drop-shadow">
                <div className="mb-5 flex">
                    <div className="flex items-center justify-center px-10">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="16"
                            viewBox="0 0 20 16"
                            fill="none"
                        >
                            <path
                                d="M18 0H2C0.897 0 0 0.897 0 2V14C0 15.103 0.897 16 2 16H18C19.103 16 20 15.103 20 14V2C20 0.897 19.103 0 18 0ZM18 2V2.511L10 8.734L2 2.512V2H18ZM2 14V5.044L9.386 10.789C9.56111 10.9265 9.77733 11.0013 10 11.0013C10.2227 11.0013 10.4389 10.9265 10.614 10.789L18 5.044L18.002 14H2Z"
                                fill="#404040"
                            />
                        </svg>
                    </div>
                    <div className="font-medium text-[#3D3D3D] truncate">
                        <Link
                            href={`mailto:${mail}`}
                        >
                            {mail}
                        </Link>
                    </div>
                </div>
                <div className="mb-5 flex">
                    <div className="flex items-center justify-center px-10">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                        >
                            <path
                                d="M10 0C4.486 0 0 4.486 0 10V14.143C0 15.167 0.897 16 2 16H3C3.26522 16 3.51957 15.8946 3.70711 15.7071C3.89464 15.5196 4 15.2652 4 15V9.857C4 9.59178 3.89464 9.33743 3.70711 9.14989C3.51957 8.96236 3.26522 8.857 3 8.857H2.092C2.648 4.987 5.978 2 10 2C14.022 2 17.352 4.987 17.908 8.857H17C16.7348 8.857 16.4804 8.96236 16.2929 9.14989C16.1054 9.33743 16 9.59178 16 9.857V16C16 17.103 15.103 18 14 18H12V17H8V20H14C16.206 20 18 18.206 18 16C19.103 16 20 15.167 20 14.143V10C20 4.486 15.514 0 10 0Z"
                                fill="#404040"
                            />
                        </svg>
                    </div>
                    <div className="font-medium text-[#3D3D3D] truncate">
                        + 1122 222 222 ext. 2064
                    </div>
                </div>
                <div className="mb-5 flex">
                    <div className="flex items-center justify-center px-10">
                        <img
                            width="23"
                            src="/img/icons/skype.png"
                            alt="worldmap"
                        />
                    </div>
                    <div className="font-medium text-[#3D3D3D] truncate">Skypeaccount</div>
                </div>
                <div className="flex ">
                    <div className="flex items-center justify-center px-10">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M12.0002 0.499984C8.91979 0.472243 5.95411 1.66736 3.75364 3.82321C1.55317 5.97907 0.297564 8.91964 0.262207 12C0.297564 15.0803 1.55317 18.0209 3.75364 20.1768C5.95411 22.3326 8.91979 23.5277 12.0002 23.5C14.3581 23.508 16.6647 22.8116 18.6242 21.5C18.7605 21.4085 18.8775 21.2911 18.9684 21.1544C19.0593 21.0178 19.1225 20.8645 19.1542 20.7035C19.1859 20.5424 19.1856 20.3767 19.1532 20.2157C19.1209 20.0548 19.0572 19.9018 18.9657 19.7655C18.8742 19.6292 18.7568 19.5122 18.6202 19.4213C18.4835 19.3303 18.3302 19.2672 18.1692 19.2355C18.0081 19.2038 17.8424 19.2041 17.6815 19.2365C17.5205 19.2688 17.3675 19.3325 17.2312 19.424C15.6836 20.4589 13.862 21.0078 12.0002 21C9.58265 21.0283 7.25252 20.0968 5.52077 18.4096C3.78902 16.7225 2.79699 14.4175 2.76221 12C2.79699 9.58251 3.78902 7.27749 5.52077 5.59035C7.25252 3.90321 9.58265 2.97167 12.0002 2.99998C14.4178 2.97167 16.7479 3.90321 18.4796 5.59035C20.2114 7.27749 21.2034 9.58251 21.2382 12V12.891C21.222 13.3952 21.0103 13.8734 20.6479 14.2244C20.2855 14.5754 19.8007 14.7717 19.2962 14.7717C18.7917 14.7717 18.3069 14.5754 17.9445 14.2244C17.5821 13.8734 17.3704 13.3952 17.3542 12.891V12C17.3729 10.937 17.0747 9.89255 16.4977 8.99963C15.9207 8.1067 15.091 7.40573 14.1142 6.986C13.1375 6.56627 12.0579 6.44678 11.0129 6.64275C9.96803 6.83871 9.0051 7.34127 8.24679 8.0864C7.48849 8.83153 6.96914 9.78551 6.7549 10.8268C6.54065 11.8681 6.64121 12.9497 7.04376 13.9336C7.44631 14.9176 8.13264 15.7595 9.01532 16.352C9.898 16.9446 10.9371 17.261 12.0002 17.261C12.7204 17.2611 13.4333 17.1166 14.0966 16.8359C14.7598 16.5552 15.3599 16.1441 15.8612 15.627C16.4364 16.3324 17.2147 16.844 18.0904 17.0922C18.9661 17.3405 19.897 17.3134 20.7569 17.0147C21.6168 16.7161 22.364 16.1602 22.8973 15.4226C23.4306 14.6849 23.7241 13.8011 23.7382 12.891V12C23.7029 8.91964 22.4472 5.97907 20.2468 3.82321C18.0463 1.66736 15.0806 0.472243 12.0002 0.499984ZM12.0002 14.761C11.4579 14.7431 10.9328 14.566 10.4905 14.2516C10.0483 13.9373 9.70832 13.4996 9.51314 12.9933C9.31796 12.487 9.27618 11.9345 9.39301 11.4046C9.50984 10.8747 9.7801 10.3909 10.1701 10.0137C10.5601 9.63638 11.0525 9.38228 11.586 9.28306C12.1195 9.18385 12.6703 9.24391 13.1699 9.45574C13.6694 9.66758 14.0956 10.0218 14.3951 10.4743C14.6946 10.9267 14.8543 11.4574 14.8542 12C14.8408 12.7442 14.5328 13.4528 13.9978 13.9703C13.4629 14.4879 12.7445 14.7722 12.0002 14.761Z"
                                fill="#404040"
                            />
                        </svg>
                    </div>
                    <div className="font-medium text-[#3D3D3D] truncate">
                        support@avapartner.com
                    </div>
                </div>
            </div>

            <div className="mt-5 px-4">
                <Button className="w-full" variant="outline" size="lg">
                    Open a Ticket
                </Button>
            </div>
        </div>
    );
};

export default AccountManager;