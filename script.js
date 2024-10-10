let mm = gsap.matchMedia()

mm.add("(min-width: 640px)", () => {
    function animateHomeSection() {
        
        gsap.set(".box, .box2, .box1, .box5, .box6, .box4, .box3", { clearProps: "all" })
        gsap.from(".box", { duration: 1, delay: 0.2, x: -100, opacity: 0, ease: "power1.out" })
        gsap.from(".box2", { duration: 0.8, delay: 0.5, x: -100, opacity: 0, ease: "power1.out" })
        //gsap.from(".box1", { duration: 1, delay: 0.2, y: -100, opacity: 0, ease: "power1.out" })
        gsap.from(".box5", { duration: 1, delay: 0.2, y: 100, opacity: 0, ease: "power1.out" })
        gsap.from(".box6", { duration: 1, delay: 0.2, x: 100, opacity: 0, ease: "power1.out" })
        gsap.from(".box4", { duration: 0.8, opacity: 0, delay: 0.5, x: 100, ease: "power1.out" })
        gsap.from(".box3", { delay: 0.2, duration: 0.6, scale: 0.8, opacity: 0, ease: "power1.out" })
    }


    function animateProjectsSection() {
        
        gsap.set(".dis, .link,.thumbnail", { clearProps: "all" })
        gsap.from(".thumbnail", { delay: 0.2, duration: 0.6, scale: 0.8, opacity: 0, ease: "power1.out" })
        gsap.from(".dis", { duration: 1, delay: 0.1, y: -30, opacity: 0, ease: "power1.out" })
        gsap.from(".link", { duration: 1, delay: 0, x: 30, opacity: 0, ease: "power1.out" })
    }

    function animateContactSection() {
        
        gsap.set(".contact-form,.mail,.github,.linkedin,social", { clearProps: "all" })
        gsap.from(".contact-form", { y: 50, duration: 0.6, scale: 0.9, opacity: 0, ease: "power1.out", delay: 0.1 })
        gsap.from(".mail", { duration: 0.6, delay: 0.2, x: -70, opacity: 0, ease: "power1.out" })
        gsap.from(".linkedin", { duration: 1, delay: 0.3, y: -100, opacity: 0, ease: "power1.out" })
        gsap.from(".github", { duration: 1, delay: -0.1, x: 100, opacity: 0.1, ease: "power1.out" })
        gsap.from(".social a", { duration: 0.4, x: -100, opacity: 0, ease: "power1.out", stagger: 0.1 })
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');

            document.querySelectorAll('.section').forEach(section => {
                section.classList.add('hidden');
                section.classList.remove('visible');
                link.classList.remove("text-white")
            });

            navLinks.forEach(navLink => {
                navLink.classList.remove('text-white');
                navLink.parentElement.classList.remove('active');
            });

            const targetSection = document.getElementById(targetId);
            targetSection.classList.add('visible');
            targetSection.classList.remove('hidden');

            if (targetId === 'home') {
                animateHomeSection();
            } else if (targetId === 'projects') {
                animateProjectsSection();
            } else if (targetId === 'contact') {
                animateContactSection();
            }
            link.classList.add("text-white")
            link.parentElement.classList.add('active');


        });
    });
    window.addEventListener('load', () => {
        document.getElementById('home').classList.add('visible');
        document.getElementById('home').classList.remove('hidden');
        animateHomeSection();
    });


})


mm.add("(max-width: 641px)", () => {

    function animateHomeSection() {
        gsap.from("#home div", {
            duration: 0.6,
            x: (index) => {
                return index % 2 === 0 ? -100 : 100;
            },
            opacity: 0,
            ease: "power1.out",
            stagger: 0.1
        })

    }

    function animateProjectsSection() {
        
        gsap.set(".dis, .link,.thumbnail", { clearProps: "all" })
        gsap.from(".thumbnail", {delay: 0.2,duration: 0.6,scale: 0.8,opacity: 0,ease: "power1.out"})
        gsap.from(".dis", {duration: 1,delay: 0.1,x: -30,opacity: 0,ease: "power1.out"})
        gsap.from(".link", {duration: 1,delay: 0,x: 30,opacity: 0,ease: "power1.out"})
    }

    function animateContactSection() {
        gsap.set(".contact-form,.mail,.github,linkedin,social", { clearProps: "all" })

        gsap.from(".contact-form", {y: 50,duration: 0.6,scale: 0.9,opacity: 0,ease: "power1.out",delay: 0.1})
        gsap.from(".mail", {duration: 0.8,delay: 0.2,y: -30,opacity: 0,ease: "power1.out"})
        gsap.from(".linkedin", {duration: 0.6,delay: -0.1,x: 100,opacity: 0,ease: "power1.out"})
        gsap.from(".github", {duration: 1,delay: 0.3,x: -100,opacity: 0,ease: "power1.out"})
        gsap.from(".social a", {duration: 0.4,y: 100,opacity: 0,ease: "power1.out",stagger: 0.1})

    }
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            document.querySelectorAll('.section').forEach(section => {
                section.classList.add('hidden');
                section.classList.remove('visible');
                link.classList.remove("text-white")
            });

            navLinks.forEach(navLink => {
                navLink.classList.remove('text-white');
                navLink.parentElement.classList.remove('active');
            });

            const targetSection = document.getElementById(targetId);
            targetSection.classList.add('visible');
            targetSection.classList.remove('hidden');

            if (targetId === 'home') {
                animateHomeSection();
            } else if (targetId === 'projects') {
                animateProjectsSection();
            } else if (targetId === 'contact') {
                animateContactSection();
            }
            link.classList.add("text-white")
            link.parentElement.classList.add('active');


        });
    });
    window.addEventListener('load', () => {
        document.getElementById('home').classList.add('visible');
        document.getElementById('home').classList.remove('hidden');
        animateHomeSection();
    });

})

function composeEmail() {
    const recipient = "demo23112005@gmail.com"
    const subject = "wamt to reach you"
    const body = "Hey there i want to work with you"
    const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
}


function initializeCarousel() {
    const items = document.querySelectorAll('.item');
    let currentIndex = 0;
    items.forEach((item, index) => {
        gsap.set(item, { left: index === 0 ? '0%' : '100%', zIndex: index === 0 ? 2 : 1 });
    });

    function scrollNextImage() {
        const currentImage = items[currentIndex];
        const nextIndex = (currentIndex + 1) % items.length;
        const nextImage = items[nextIndex];

        gsap.set(nextImage, { left: '100%', zIndex: 2 });

        gsap.to(nextImage, {
            left: '0%',
            duration: 1.5,
            ease: 'power2.inOut',
        });

        gsap.to(currentImage, {
            left: '-100%',
            duration: 1.5,
            ease: 'power2.inOut',
            onComplete: () => {
                currentIndex = nextIndex;
                gsap.set(currentImage, { left: '100%', zIndex: 1 });
            },
        });
    }

    setInterval(scrollNextImage, 2000);
}
initializeCarousel()

