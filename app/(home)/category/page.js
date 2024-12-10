// app/[category]/page.js
"use client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import allCollectionDataStore from "@/store/allCollectionDataStore";
import { fetchAllCollectionsData } from "@/api/fetchAllCollections";

import Link from "next/link";
import { nav2 } from "@/data/nav2";
import { useEffect } from "react";

export default function CategoryPage() {
    const { allCollectionsData, setAllCollectionsData } =
        allCollectionDataStore();

    useEffect(() => {
        const f = async () => {
            if (allCollectionsData != null) return;
            const allData = await fetchAllCollectionsData();
            console.log("allcollectiondata222", allData);
            setAllCollectionsData(allData);
        };
        f();
    }, []);
    return (
        <div>
            <BreadCrumb />
            <BookCarousel allCollectionsData={allCollectionsData} />
        </div>
    );
}

const BreadCrumb = () => {
    return (
        <div className="flex min-h-[100vh]  justify-between items-center py-4 my-auto h-fit mx-auto md:mt-10 px-5 md:px-20 bg-slate-100">
            {/* Breadcrumb Navigation */}
            <div>
                <div className="text-gray-600 text-sm flex space-x-2">
                    <a href="/" className="hover:text-gray-900">
                        HOME
                    </a>
                    <span>/</span>
                    <a href="/books" className="hover:text-gray-900">
                        BOOKS
                    </a>
                </div>
                <h1 className="md:text-2xl font-semibold text-gray-800 mt-3">
                    Books on Indian Culture
                </h1>
            </div>

            <div className="">
                <button className="flex items-center text-gray-600 hover:text-gray-900">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M18 8c0-3.314-2.686-6-6-6S6 4.686 6 8c0 1.655.673 3.315 2 4.447v1.11a4 4 0 001.664 3.2l-1.575 2.363A6 6 0 018 18c-3.314 0-6-2.686-6-6 0-1.654.672-3.314 2-4.447V7.552A6 6 0 018 1h4c3.314 0 6 2.686 6 6 0 1.654-.672 3.315-2 4.447v1.11a4 4 0 01-1.664 3.2l1.575 2.363a6 6 0 00-.889-8.909z"
                        />
                    </svg>
                    Share
                </button>
            </div>
        </div>
    );
};

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
    },
};

const BookCarousel = ({ allCollectionsData }) => {
    const books = [
        {
            title: "Books on Vedas",
            image: "/carosl-temp.jpg",
        },
        {
            title: "Upanishads Books",
            image: "/carosl-temp.jpg",
        },
        {
            title: "Hindu Purana",
            image: "/carosl-temp.jpg",
        },
        // Add more books if needed
    ];

    // console.log(Object.keys(nav2.Books));

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row">
                {/* Carousel Section */}
                <div className="lg:w-3/4 w-full ">
                    {allCollectionsData &&
                        Object.keys(allCollectionsData).map((colln) => {
                            if (
                                allCollectionsData[colln] &&
                                allCollectionsData[colln].length > 0
                            ) {
                                return (
                                    <div key={colln}>
                                        <CaroslComp
                                            collectionData={
                                                allCollectionsData[colln]
                                            }
                                            collectionName={colln}
                                        />
                                        <hr className="my-8" />
                                    </div>
                                );
                            }
                        })}

                    {/* {nav2.map((subCategory) => (
                        <div key={subCategory}>
                            <CaroslComp
                            // books={books}
                            // subCategory={subCategory}
                            />
                            <hr className="my-8" />
                        </div>
                    ))} */}

                    {/* <CaroslComp books={books} subCategory={`Hindu`} /> */}
                    {/* <hr className="my-8" />
          <CaroslComp books={books} subCategory={``} />
          <hr className="my-8" />
          <CaroslComp books={books} subCategory={``} /> */}
                </div>

                {/* Description Section */}
                <div className="lg:w-1/4 w-full lg:pl-8 mt-6 lg:mt-0">
                    <h2 className="text-2xl font-bold mb-4">
                        Culture of India Captured in Books
                    </h2>
                    <p className="text-sm leading-relaxed">
                        India has a rich history and was a pioneer of learning
                        with many universities like Nalanda. These centers of
                        learning have been the home to many great sages and
                        knowledgeable people like Aryabhatta. All their
                        knowledge has been captured in different books.
                    </p>
                    <p className="text-sm leading-relaxed mt-4">
                        India has a rich history and was a pioneer of learning
                        with many universities like Nalanda. These centres of
                        learning have been the home to many great sages and
                        knowledgeable people like Aryabhatta. All their
                        knowledge has been captured in different books. Exotic
                        India has collected a wide range of these texts for your
                        enjoyment and education. We have everything from the
                        Vedas to Indian history books for sale. All of our
                        editions are handpicked to bring you the greatest Indian
                        book collection online today. These books allow you to
                        study and embrace the staggering breadth and depth of
                        India’s intellectual achievements. We have editions of
                        some of the oldest books ever written by humanity, while
                        we also have books reaching up to the present day. It’s
                        a selection that continues to expand as Indian writers
                        and sages continue to ask the big questions about life
                        and the universe. These are works that you and your
                        family will benefit from for years to come. And what’s
                        even better? They are all available through Exotic
                        India’s convenient online shopping experience. To
                        appreciate all that we have to offer, let’s examine the
                        major genres we have available. Whatever Indian books
                        you are looking for, we have the selection for you.
                        Religious Books: The Vedas, Upanishads, the Bhagavad
                        Gita, and More India is the heartland of so many world
                        religions. There is no area with such a wealth of
                        spiritual wisdom, and you can enjoy all of the knowledge
                        these sages have discovered through our Indian
                        philosophy books and spiritual works. These teach us
                        about the meaning of life, the real nature of the
                        universe, how we can connect to our ancestors, as well
                        as impart valuable lessons that will put us on the right
                        path. Our Indian religious books include bhajan,
                        devotional songs that express spiritual ideas and
                        lessons. We also have classic works, like the
                        incomparable Vedas. The four Vedas are the foundation of
                        Hindu spirituality, and they are a must-read for the
                        seeker looking to understand the world. We also have
                        elegant editions of the Upanishads, which are
                        philosophical texts, and the Bhagavad Gita, perhaps the
                        most profound treatise on life and dharma. If you are
                        looking for Indian religious books for sale, our
                        selection is the best you will find. Mythological Books:
                        The Mahabharata, the Ramayana, and More The mythology of
                        India covers a great many cultures that have left behind
                        massive literature. Our mythological books impart
                        stories that teach us about the nature of the gods
                        themselves, but they also teach us about our own ways of
                        being. And when we read mythology, we take in stories
                        that have been passed down since time immemorial,
                        bringing us close to people who lived in ancient times.
                        No book collection is complete without the epics of the
                        Mahabharata and the Ramayana. These are the basis of
                        storytelling in India, and they have been enjoyed by
                        people since the earliest days of writing. We also have
                        books that tell regional folk tales. This includes
                        stories from all the many cultures that make India what
                        it is today. These stories teach us life lessons, and
                        they also teach us about the people who created them.
                        Books on Science: Ayurveda, Astrology, Yoga, and More
                        Ancient India was one of the most scientifically
                        advanced cultures of its time. That deep history of
                        learning has continued to this present day, with ever
                        more searching and ever more study developing these
                        sciences into the forefront of human knowledge. Many of
                        these schools bridge the gap between the material world
                        and the spiritual world — some of the only sciences that
                        do this in the entire world. Our astrology books teach
                        about the Indian school of astrology, which has
                        influenced the world’s understanding of the stars and
                        their impact on our lives. We also have works on
                        Ayurveda, the study of how to bring balance to our body
                        and soul to improve our wellbeing. You can also find
                        works on yoga, an artform that promises to bring us to
                        enlightenment. These vital sciences are as relevant
                        today as ever before. If we continue to learn what they
                        have to teach us, we will be well suited to take on the
                        challenges of the future. Buddhist Books: The
                        Dhammapada, Histories of Buddhism, and More Exotic India
                        has an amazing selection of Indian books on Buddhism.
                        These impart the divine teachings of the Buddha, who
                        laid out a pathway to escape suffering and the cycle of
                        rebirth. Buddha’s words have taught people how to live
                        for thousands of years, and they are still guiding
                        people to the right path. Our collection traces the
                        tradition from the Buddha himself, all the way to
                        present-day writings on living as a Buddhist in modern
                        times. These include philosophical writings as well as
                        histories. With these, you can learn about this powerful
                        religion and begin or continue your own spiritual
                        journey. Cultural Books: Dance, Music, Architecture,
                        Art, and More Our Indian books on culture teach you
                        about the legacy of the arts on the subcontinent, as
                        well as all the amazing creations going on today. It’s
                        the best education you can receive in Indian culture,
                        all just a few clicks away. India’s culture has thrived
                        for so long because it is home to so many different
                        peoples. Through cultural exchange, these groups have
                        quickly developed a tremendous amount of art. That
                        wealth of creation fascinates and entertains people
                        around the world because it is able to express something
                        universally human, yet passionately embraces the
                        cultures from which it came. Our cultural books cover
                        India’s amazing diversity of artistic forms, like dance,
                        music, visual arts, architecture, and many more. FAQs
                        Q1. What is the purpose of a religious book? The very
                        purpose of a religious book is to describe the
                        relationship between a soul (Jivatma) and God
                        (Paramatma), and how to establish that relationship.
                        This spiritual knowledge helps one to transcend the
                        three modes of material nature (Sattva, Rajas, and
                        Tamas) and be freed from the pangs of threefold miseries
                        (Adi-Daivik, Adi-Bhautik, and Adi-Adhyatmik Klesh). It
                        is believed that those who read and understand the
                        subject matter of a religious book every day, remain in
                        the light of knowledge and are not bewildered even by
                        slight changes and difficulties in life. Q2. What is
                        called a religious book? A religious book, as the name
                        suggests, is any book that talks about religion
                        (Dharma). Religion refers to the constitutional position
                        or nature of the living entities. Thus, a religious book
                        describes what is the identity of an individual, their
                        relationship with God, and how to build it. It may
                        sometimes also mention God’s names, paraphernalia,
                        pastimes, and characteristics. This knowledge is called
                        the Absolute Truth because it describes the source of
                        everything (God) from which everything is emanated. Q3.
                        What are the books of God called? Books of God are
                        called scriptures that talk about the science of God,
                        and elaborately explain how to achieve the love of
                        Godhead. The Scriptures deal with all aspects of
                        knowledge, both material and spiritual. They may also
                        mention the qualities of God, His names, paraphernalia,
                        activities, and pastimes. This knowledge sets one free
                        from material perplexities and elevates his
                        consciousness to a higher platform (spiritual platform)
                        after which, he is not affected by the pangs of material
                        existence.
                    </p>
                </div>
            </div>
        </div>
    );
};

const CaroslComp = ({ collectionData, collectionName }) => {
    return (
        <div>
            <div className=" flex flex-col justify-center items-center mb-10">
                <h2 className="text-2xl font-bold text-center">
                    {collectionName}
                </h2>
                <div>
                    <span className="w-full h-1 flex mt-2">
                        <span className="w-4 h-1 bg-orange-500 inline-block rounded-full mr-1"></span>
                        <span className="inline-block w-44 h-1 bg-orange-500 rounded-full"></span>
                        <span className="w-4 h-1 bg-orange-500 inline-block rounded-full ml-1"></span>
                    </span>
                </div>
            </div>

            <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                keyBoardControl={true}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {collectionData.map((item, index) => (
                    <div
                        key={index}
                        className="px-4 py-4 border border-red-500 mx-4 uppercase font-bold"
                    >
                        <img
                            src={item.imageUrls[0]}
                            alt={item.id}
                            className="rounded-lg"
                        />
                        <p className="text-center mt-2 font-semibold">
                            {item.product.name}
                        </p>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};
