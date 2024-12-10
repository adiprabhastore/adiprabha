import React from "react";
import {
    FacebookShareButton,
    FacebookIcon,
    WhatsappShareButton,
    WhatsappIcon,
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
    TelegramShareButton,
    TelegramIcon,
} from "next-share";

const ShareButton = () => {
    return (
        <section className="w-full flex  gap-5 justify-start      mt-5">
            <FacebookShareButton
                url={"https://github.com/next-share"}
                quote={
                    "next-share is a social share buttons for your next React apps."
                }
                hashtag={"#nextshare"}
            >
                <FacebookIcon size={32} round />
            </FacebookShareButton>

            <FacebookMessengerShareButton
                url={"https://github.com/next-share"}
                appId={""}
            >
                <FacebookMessengerIcon size={32} round />
            </FacebookMessengerShareButton>
            <WhatsappShareButton
                url={"https://github.com/next-share"}
                title={
                    "next-share is a social share buttons for your next React apps."
                }
                separator=":: "
            >
                <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <TelegramShareButton
                url={"https://github.com/next-share"}
                title={
                    "next-share is a social share buttons for your next React apps."
                }
            >
                <TelegramIcon size={32} round />
            </TelegramShareButton>
        </section>
    );
};

export default ShareButton;
