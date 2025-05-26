import Link from "next/link";
import { JSX } from "react";

import classes from "./Header.module.css";
import { TransitionLink } from "../../Animations/TransitionLink";

export default function Header(): JSX.Element {
    return (
        <>
            <input type="checkbox" id="navBarToggler" className={classes.togglerInput} />
            <header id="site-header" className={classes.header + " boxSpacer py-0"}>
                <div className={classes.progress}></div>
                <div className="flex items-center justify-between gap-4 max-md:w-full">
                    <TransitionLink className="headingsFont" href={"/"}>
                        <div className="doubleTextBtn">
                            <span>Mrinmayee</span>
                            <span>Mrinmayee</span>
                        </div>
                    </TransitionLink>
                    <label htmlFor="navBarToggler" className={classes.toggler}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                        </svg>
                    </label>
                </div>
                <ul className={classes.mainList}>
                    <li>
                        <TransitionLink href={"/"} className="flex w-fit items-center px-4 py-2">
                            <div className="doubleTextBtn">
                                <span>Home</span>
                                <span>Home</span>
                            </div>
                        </TransitionLink>
                    </li>
                    <li>
                        <TransitionLink href={"/works"} className="flex w-fit items-center px-4 py-2">
                            <div className="doubleTextBtn">
                                <span>Works</span>
                                <span>Works</span>
                            </div>
                        </TransitionLink>
                    </li>
                    <li>
                        <TransitionLink href={"/gallery"} className="flex w-fit items-center px-4 py-2">
                            <div className="doubleTextBtn">
                                <span>Gallery</span>
                                <span>Gallery</span>
                            </div>
                        </TransitionLink>
                    </li>
                    <li>
                        <TransitionLink href={"/contact"} className="flex w-fit items-center px-4 py-2">
                            <div className="doubleTextBtn">
                                <span>Contact</span>
                                <span>Contact</span>
                            </div>
                        </TransitionLink>
                    </li>
                </ul>
            </header>
            <Link className="backToTop" href={"#main"}>
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"></path>
                    </svg>
                </div>
                <svg className="progress-circle" fill="none" width="40" height="40" viewBox="-1 -1 102 102">
                    <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"></path>
                </svg>
            </Link>
        </>
    );
}
