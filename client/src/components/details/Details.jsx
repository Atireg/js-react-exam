import { useEffect } from "react";
import projectService from "../../services/projectService";

export default function Details() {

    // Just a test

    useEffect(() => {
            projectService.getAll()
            .then(result => {
                console.log(result);
                
            })
    }, [])

    return (
        <div className="content-container">
            <main>
                <ul className="gallery">
                    <li className="hero">
                        <a href="#">
                            <figure>
                                <img src="/images/rock-print/hero.jpg" alt="" />
                                <figcaption>&copy; Image by ...</figcaption>
                            </figure>
                        </a>
                    </li>

                    <li className="gallery-img">
                        <a href="#">
                            <figure>
                                <img src="/images/rock-print/image1.jpg" alt="" />
                                <figcaption>&copy; Image by ...</figcaption>
                            </figure>
                        </a>
                    </li>

                    <li className="gallery-img">
                        <a href="#">
                            <figure>
                                <img src="/images/rock-print/image2.jpg" alt="" />
                                <figcaption>&copy; Image by ...</figcaption>
                            </figure>
                        </a>
                    </li>

                    <li className="gallery-img">
                        <a href="#">
                            <figure>
                                <img src="/images/rock-print/image3.jpg" alt="" />
                                <figcaption>&copy; Image by ...</figcaption>
                            </figure>
                        </a>
                    </li>

                    <li className="gallery-img">
                        <a href="#">
                            <figure>
                                <img src="/images/rock-print/image4.jpg" alt="" />
                                <figcaption>&copy; Image by ...</figcaption>
                            </figure>
                        </a>
                    </li>


                    <li className="gallery-img">
                        <a href="#">
                            <figure>
                                <img src="/images/rock-print/image5.jpg" alt="" />
                                <figcaption>&copy; Image by ...</figcaption>
                            </figure>
                        </a>
                    </li>

                    <li className="gallery-img">
                        <a href="#">
                            <figure>
                                <img src="/images/rock-print/image6.jpg" alt="" />
                                <figcaption>&copy; Image by ...</figcaption>
                            </figure>
                        </a>
                    </li>
                </ul>

                <dialog>
                    <button>Close</button>
                </dialog>
            </main>

            <aside>
                <section className="threeDcontent">
                    <h2>3D content here</h2>
                </section>
                <section className="description">
                    <h2>Rock Print Pavilion</h2>
                    <h3>Winterthur 2018</h3>
                    <h5>role: research and project lead</h5>
                    <h5>venue: Hello Robot Exhibition, Kunst Museum Winterthur</h5>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi illo fugit praesentium iure deleniti
                        porro iste laboriosam odit numquam esse atque, voluptatibus maxime deserunt aut assumenda distinctio
                        perferendis totam ex!</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi illo fugit praesentium iure deleniti
                        porro iste laboriosam odit numquam esse atque, voluptatibus maxime deserunt aut assumenda distinctio
                        perferendis totam ex!</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi illo fugit praesentium iure deleniti
                        porro iste laboriosam odit numquam esse atque, voluptatibus maxime deserunt aut assumenda distinctio
                        perferendis totam ex!</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi illo fugit praesentium iure deleniti
                        porro iste laboriosam odit numquam esse atque, voluptatibus maxime deserunt aut assumenda distinctio
                        perferendis totam ex!</p>
                </section>
            </aside>
        </div>
    )
}