import { AnimatePresence, delay, easeIn, easeInOut, easeOut, motion, useAnimationControls } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { GrNext } from 'react-icons/gr'
import { useMediaQuery } from 'react-responsive';
import DinoAbout from './DinoAbout';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const EventsCard = ({ eventsList }) => {

    const controls = useAnimationControls()
    const controlSlide = useAnimationControls()
    const nextRef = useRef(null)
    const [index, setIndex] = useState(0)
    const [isHover, setIsHover] = useState(false)
    const [nextSlid, setNextSlid] = useState(false)
    const [clicked, setClicked] = useState(false)
    const [knowMore, setKnowMore] = useState(false)
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' }); // Adjust breakpoint as needed
    const onMouseEnter = () => {
        setIsHover(true)
    }

    const onMouseExits = () => {
        setIsHover(false)
    }

    const onMouseExitsNext = () => {
        // console.log(isHover)
        controls.start({ x: -50, opacity: 0 })
        controlSlide.start({ x: 50, opacity: 0 })
    }
    const onMouseEnterNext = () => {
        // console.log(isHover)
        controls.start({ x: 0, opacity: 1 })
        controlSlide.start({ x: 0, opacity: 1 })
    }

    const onClickNext = () => {
        setIsHover(false);
        setNextSlid(true)
        setIndex((prevIndex) => {
            return prevIndex === eventsList.length - 1 ? 0 : prevIndex + 1
        });
    };

    const hoverNext = () => {
        setNextSlid(false)
    }


    const onClickedPic = () => {
        if (isMobile) {
            setClicked(!clicked)
        }
    }
    const handleOutsideClick = (e) => {
        if (isMobile) {
            if (e.target === e.currentTarget) {
                setClicked(false);
            }
        }
    }

    const onClickMore = () => {
        setKnowMore(!knowMore)
    }

    const [currentSlide, setCurrentSlide] = useState(0);

    const settings = {
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 4000,
        cssEase: "linear",
        beforeChange: (current, next) => {
            setCurrentSlide(next);
        },
    };

    useEffect(() => {
        // Reset to the first slide
        setCurrentSlide(0);
    }, [index]);

    return (
        <div
            className='h-[70vh] md:h-[80vh] w-[85vw] md:w-[25vw] flex items-center justify-center px-5 relative gap-20 '
        >

            <div
                className='flex flex-col gap-4 w-full h-full md:h-auto bg-zinc-200 tracking-tighter md:text-xs text-lg md:leading-none text-zinc-800 relative py-4 px-2 rounded-lg'
            >

                {/* Chat Bubbule Wrap */}
                <div className='w-full px-5 flex flex-col gap-2'>
                    <div className='w-full flex justify-start'>
                        <p className='tracking-tight uppercase relative border-[1px] border-zinc-100 rounded-xl bg-white px-4  py-1 pr-10 text-xs font-poppins' >
                            Wanna Explore Our Event?
                        </p>
                    </div>
                    <div className='w-full flex justify-end'>
                        <p className='uppercase text-xs relative border-[1px] border-zinc-100 rounded-xl bg-white text-zinc-800 px-4  py-1 font-poppins'>
                            For Sure
                        </p>
                    </div>
                </div>

                {/* Photos Collection  :: Curr Slid*/}
                <div className='h-fit relative'>

                    <div
                        className='w-[90vw] md:w-[30vw] h-[45vh] flex gap-2 relative -left-5'
                        onMouseEnter={onMouseEnterNext}
                        onMouseLeave={onMouseExitsNext}
                    >
                        <img
                            src={eventsList[index].Img[0]}
                            alt="event-img"
                            className=' h-[100%] md:h-auto w-[65%] object-cover object-center rounded-xl'
                            onMouseEnter={onMouseEnter}
                            onMouseLeave={onMouseExits}
                            onClick={onClickedPic}
                        />

                        <img
                            src={eventsList[index].nextImg[0]}
                            alt="event-img"
                            className=' w-[16%] object-left object-cover rounded-xl rounded-r-none'
                            ref={nextRef}
                        />

                        <motion.div
                            className={`hidden md:flex text-2xl items-center justify-start cursor-pointer relative left-4 md:left-0 `}
                            initial={{ x: -50, opacity: 0 }}
                            animate={controls}
                            transition={{ duration: 0.3, ease: easeOut }}
                        >
                            <div
                                className='h-fit w-fit'
                                onClick={onClickNext}
                                onMouseEnter={hoverNext}
                            >

                                <GrNext />
                            </div>
                        </motion.div>
                        
                        {isMobile &&
                            <motion.div
                                className={`flex text-2xl items-center justify-start cursor-pointer relative left-4 md:left-0 `}
                            >
                                <div
                                    className='h-fit w-fit'
                                    onClick={onClickNext}
                                    onMouseEnter={hoverNext}
                                >

                                    <GrNext />
                                </div>
                            </motion.div>

                        }
                    </div>

                    {/* //Second Slid  */}
                    <motion.div
                        className={`${nextSlid ? 'flex' : 'hidden'} w-[90vw] md:w-[30vw] h-[45vh] gap-2 absolute top-0 -left-5 z-20`}
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, ease: easeIn }}
                    >

                        <img
                            src={eventsList[index].Img[0]}
                            alt="event-img"
                            className=' h-[100%] md:h-auto w-[65%] object-cover object-center rounded-xl'
                            onMouseEnter={onMouseEnter}
                            onMouseLeave={onMouseExits}
                            onClick={onClickedPic}
                        />

                        <img
                            src={eventsList[index].nextImg[0]}
                            alt="event-img"
                            className=' w-[16%] object-left object-cover rounded-xl rounded-r-none'
                            ref={nextRef}
                        />

                        <motion.div
                            className='flex text-2xl items-center justify-start cursor-pointer relative left-4 md:left-0 '
                            initial={{ x: -50, opacity: 0 }}
                            animate={controls}
                            transition={{ duration: 0.3, ease: easeOut }}
                        >
                            <div
                                className='h-fit w-fit'
                                onClick={onClickNext}
                                onMouseEnter={hoverNext}

                            >

                                <GrNext />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>


                {/* About */}
                <div className='px-4 font-poppins tracking-tight text-xs text-zinc-500 flex flex-col justify-center '>
                    {eventsList[index].eventAbout}

                    <div className='w-full flex justify-center'>

                        <motion.button
                            className=' w-fit text-xs text-zinc-50 bg-zinc-700 border-[1px] rounded-2xl font-poppins px-3 py-1 mt-2'
                            whileHover={{ scale: 1.05, backgroundColor: "#111827", color: "FFFFFF" }}
                            whileTap={{ scale: 0.99 }}
                            onClick={onClickMore}
                        >
                            Know More
                        </motion.button>
                    </div>
                </div>

            </div>

            {/* While Hover : Collage Photo*/}

            <AnimatePresence>
                <motion.div
                    className={`h-[70vh] md:h-[65vh] w-[80vw] md:w-[25vw] ${clicked ? "block" : "hidden"} ${clicked ? "absolute" : "static"} md:block left-10 -top-4`}
                    onClick={handleOutsideClick}
                >

                    <motion.div
                        className={`w-[80%] md:h-[80%] h-[70%] absolute top-[14%] bg-[#717171d8] rounded-2xl pt-2 items-center justify-around z-30`}
                        initial={{ scale: 1, x: 50, opacity: 0.5 }}
                        // whileInView={{ scale: 1, x: 0, opacity: 1 }}
                        animate={controlSlide}
                        transition={{ duration: 0.5, ease: easeIn }}
                    >

                        <Slider {...settings}>
                            {eventsList[index].Img.map((img, slideIndex) => (
                                <div key={slideIndex} className="w-full flex justify-center items-center h-[45%] pt-5 md:pt-0 ">
                                    <img
                                        src={img}
                                        alt="Event Img"
                                        className=' w-full pl-2 pr-2 h-28 object-fill object-center'
                                    />
                                </div>
                            ))}
                        </Slider>

                        <h1 className='text-4xl font-extrabold text-zinc-100 w-full flex justify-center pb-2'>
                            {eventsList[index].eventName}
                        </h1>

                        <div className='flex gap-2 w-full h-[50%] justify-center box-border pb-2'>
                            <img
                                src={eventsList[index].Img[currentSlide]}
                                alt="Event-img"
                                className='w-full h-full object-contain bg-black object-center '
                            />
                            {/* {eventsList[index].Img.length > 1 && (
                            <img
                                src={eventsList[index].Img[(currentSlide + 1) % eventsList[index].Img.length]}
                                alt="Event-img"
                                className='w-[45%] h-full object-cover object-center rounded-xl'
                            />
                        )} */}
                        </div>

                    </motion.div>
                </motion.div>
            </AnimatePresence>

            {/* Dino-Know More */}
            <AnimatePresence>
                {
                    knowMore &&
                    <motion.div
                        className={
                            `fixed bottom-0 left-0 flex items-end gap-0 rounded-lg p-4 pl-0 max-w-sm sm:max-w-md md:max-w-lg `
                        }
                        style={{ zIndex: 1000 }}
                        onClick={onClickMore}
                        initial={{ scale: 1, y: 100, x: -100, opacity: 0.5 }}
                        animate={{ scale: 1, y: 0, x: 0, opacity: 1 }}
                        exit={{ scale: 1, y: 100, x: -100, opacity: 1 }}
                        transition={{ duration: 0.5, ease: easeInOut }}
                    >
                        < DinoAbout
                            eventName={eventsList[index].eventName}
                            eventAbout={eventsList[index].eventKnowMore}
                        />
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}

export default EventsCard