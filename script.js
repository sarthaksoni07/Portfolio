 document.addEventListener("DOMContentLoaded", function () {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        const renderer = new THREE.WebGLRenderer({
          canvas: document.getElementById("bg-canvas"),
          antialias: true,
          alpha: true,
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // Create background particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 2000;

        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
          posArray[i] = (Math.random() - 0.5) * 20;
        }

        particlesGeometry.setAttribute(
          "position",
          new THREE.BufferAttribute(posArray, 3)
        );

        const particlesMaterial = new THREE.PointsMaterial({
          size: 0.02,
          color: 0x8a8aff,
          transparent: true,
          opacity: 0.8,
        });

        const particlesMesh = new THREE.Points(
          particlesGeometry,
          particlesMaterial
        );
        scene.add(particlesMesh);

        const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
        const cubeMaterial = new THREE.MeshStandardMaterial({
          color: 0x6e8efb,
          wireframe: true,
        });

        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        scene.add(cube);

        camera.position.z = 5;

        // Animation function
        function animate() {
          requestAnimationFrame(animate);

          particlesMesh.rotation.x += 0.0005;
          particlesMesh.rotation.y += 0.0005;

          cube.rotation.x += 0.01;
          cube.rotation.y += 0.01;

          renderer.render(scene, camera);
        }

        animate();

        // Handle window resizing
        window.addEventListener("resize", () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        });

        gsap.to(".hero h1", {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
        });

        gsap.to(".hero p", {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.4,
        });

        gsap.to(".btn", {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.6,
        });

        // Animate skill progress bars on scroll
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const progressBars = document.querySelectorAll(".skill-progress");
              progressBars.forEach((bar) => {
                const level = bar.getAttribute("data-level");
                gsap.to(bar, {
                  width: `${level}%`,
                  duration: 1.5,
                  ease: "power3.out",
                });
              });
            }
          });
        });

        observer.observe(document.querySelector(".skills-container"));

        // Custom cursor
        const cursor = document.querySelector(".cursor");
        const cursorDot = document.querySelector(".cursor-dot");

        document.addEventListener("mousemove", (e) => {
          gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
          });

          gsap.to(cursorDot, {
            x: e.clientX,
            y: e.clientY,
            duration: 0,
          });
        });

        // Navigation bar scroll effect
        window.addEventListener("scroll", () => {
          const navbar = document.getElementById("navbar");
          if (window.scrollY > 100) {
            navbar.classList.add("scrolled");
          } else {
            navbar.classList.remove("scrolled");
          }
        });

        // Create particles
        const particlesContainer = document.getElementById("particles");
        const particleCount = 20;

        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement("div");
          particle.className = "particle";

          const size = Math.random() * 4 + 2;
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;

          particle.style.left = `${Math.random() * 100}%`;
          particle.style.top = `${Math.random() * 100}%`;

          const duration = Math.random() * 10 + 10;
          particle.style.animationDuration = `${duration}s`;

          const delay = Math.random() * 10;
          particle.style.animationDelay = `${delay}s`;

          particlesContainer.appendChild(particle);
        }

        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
          anchor.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            window.scrollTo({
              top: targetElement.offsetTop - 100,
              behavior: "smooth",
            });
          });
        });
      });