document.addEventListener('DOMContentLoaded', () => {
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

    /* ---------- CATEGORY NAV ---------- */
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');

            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            menuSections.forEach(section => {
                section.classList.toggle('active', section.id === category);
            });

            if (quickNavPanel) quickNavPanel.classList.remove('active');
        });
    });

    /* ---------- FLOATING QUICK NAV ---------- */
    if (floatingNavBtn && quickNavPanel) {
        floatingNavBtn.addEventListener('click', () => {
            quickNavPanel.classList.toggle('active');
        });

        quickNavBtns.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-category');

                // sync main nav
                categoryButtons.forEach(btn => {
                    const matches = btn.getAttribute('data-category') === category;
                    btn.classList.toggle('active', matches);
                });

                // show section and scroll
                menuSections.forEach(section => {
                    const isMatch = section.id === category;
                    section.classList.toggle('active', isMatch);
                    if (isMatch) {
                        setTimeout(() => section.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
                    }
                });

                quickNavPanel.classList.remove('active');
            });
        });
    }

    /* ---------- SCROLL TO TOP + STICKY NAV ---------- */
    window.addEventListener('scroll', () => {
        if (scrollToTopBtn) {
            scrollToTopBtn.classList.toggle('active', window.scrollY > 280);
        }
        if (categoryNav) {
            categoryNav.classList.toggle('scrolled', window.scrollY > 80);
        }
    });

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ---------- ITEM MODAL ---------- */
    if (itemModal && closeModal) {
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                const name = item.querySelector('.item-name')?.textContent || '';
                const price = item.querySelector('.item-price')?.textContent || '';
                const desc = item.querySelector('.item-desc')?.textContent || '';
                const tagsElement = item.querySelector('.item-tags');
                const tags = tagsElement ? tagsElement.innerHTML : '';

                document.querySelector('.modal-title').textContent = name;
                document.querySelector('.modal-price').textContent = price;
                document.querySelector('.modal-desc').textContent = desc;
                document.querySelector('.modal-tags').innerHTML = tags;

                itemModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        closeModal.addEventListener('click', () => {
            itemModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        itemModal.addEventListener('click', e => {
            if (e.target === itemModal) {
                itemModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
});
