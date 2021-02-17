import React from 'react'
import Typed from 'react-typed';
export const Hero = () => {

    return (
       <React.Fragment>
            <section id="hero" className="test">
            <div className=" hero-text text-center">
                <Typed
                    strings={[
                        'Review Movie',
                        'Search for Movie',
                        'Track Nomination']}
                    typeSpeed={40}
                    backSpeed={50}
                    loop >
                </Typed>
                

            </div>
            <section id="section07" className="demo">
                    <a href="#app"><span /><span /><span />Scroll</a>
                </section>
        </section>
       </React.Fragment>
    )
}