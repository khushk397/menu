document.addEventListener('DOMContentLoaded', function () {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuSections = document.querySelectorAll('.menu-section');
    const floatingNavBtn = document.querySelector('.floating-nav-btn');
    const quickNavPanel = document.querySelector('.quick-nav-panel');
    const quickNavBtns = document.querySelectorAll('.quick-nav-btn');
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    const categoryNav = document.querySelector('.category-nav');
    const menuItems = document.querySelectorAll('.menu-item');
    const itemModal = document.querySelector('.item-modal');
    const closeModal = document.querySelector('.close-modal');

    // Category navigation
    categoryButtons.forEach(button => {
        button.addEventListener('click', function () {
            const category = this.getAttribute('data-category');

            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Show corresponding section
            menuSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === category) {
                    section.classList.add('active');
                }
            });

            // Close quick nav panel if open
            quickNavPanel.classList.remove('active');
        });
    });

    // Floating navigation button
    floatingNavBtn.addEventListener('click', function () {
        quickNavPanel.classList.toggle('active');
    });

    // Quick navigation buttons
    quickNavBtns.forEach(button => {
        button.addEventListener('click', function () {
            const category = this.getAttribute('data-category');

            // Update active button in main nav
            categoryButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-category') === category) {
                    btn.classList.add('active');
                }
            });

            // Show corresponding section
            menuSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === category) {
                    section.classList.add('active');
                    // Scroll to section
                    setTimeout(() => {
                        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                }
            });

            // Close quick nav panel
            quickNavPanel.classList.remove('active');
        });
    });

    // Scroll to top button
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('active');
        } else {
            scrollToTopBtn.classList.remove('active');
        }

        // Sticky category nav
        if (window.scrollY > 100) {
            categoryNav.classList.add('scrolled');
        } else {
            categoryNav.classList.remove('scrolled');
        }
    });

    scrollToTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Menu item click for details
    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            const name = this.querySelector('.item-name').textContent;
            const price = this.querySelector('.item-price').textContent;
            const desc = this.querySelector('.item-desc').textContent;
            const tagsElement = this.querySelector('.item-tags');
            const tags = tagsElement ? tagsElement.innerHTML : '';

            document.querySelector('.modal-title').textContent = name;
            document.querySelector('.modal-price').textContent = price;
            document.querySelector('.modal-desc').textContent = desc;
            document.querySelector('.modal-tags').innerHTML = tags;

            itemModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    closeModal.addEventListener('click', function () {
        itemModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    itemModal.addEventListener('click', function (e) {
        if (e.target === itemModal) {
            itemModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});