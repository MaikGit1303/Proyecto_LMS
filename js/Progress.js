document.addEventListener('DOMContentLoaded', function() {
    const viewTopicsLinks = document.querySelectorAll('.view-topics-link');
    const modal = document.getElementById('topics-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    function closeModal() {
        modal.classList.add('hidden');
        document.body.style.overflow = ''; // Restore scroll
    }

    viewTopicsLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            alert('Mostrar temas para: ' + link.closest('.progress-card').querySelector('h3').textContent);
        });
    });

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Visual effects for cards
    const progressCards = document.querySelectorAll('.progress-card');
    progressCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
            card.style.transform = 'translateY(-5px)';
            card.style.transition = 'all 0.3s ease';
        });
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            card.style.transform = 'translateY(0)';
        });
    });
});
