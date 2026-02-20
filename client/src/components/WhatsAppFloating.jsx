import React, { useState, useRef, useEffect } from 'react';

const WhatsAppFloating = () => {
    // Requirements
    const phoneNumber = "918984679398";
    const message = "Hello, I am interested in your services.";

    const containerRef = useRef(null);
    const dragInfo = useRef({
        isDragging: false,
        hasMoved: false,
        startX: 0,
        startY: 0,
        initialX: 0,
        initialY: 0
    });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleStart = (e) => {
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            const clientY = e.clientY || (e.touches && e.touches[0].clientY);

            const rect = container.getBoundingClientRect();
            dragInfo.current = {
                isDragging: false,
                hasMoved: false,
                startX: clientX,
                startY: clientY,
                initialX: rect.left,
                initialY: rect.top
            };

            window.addEventListener('mousemove', handleMove);
            window.addEventListener('mouseup', handleEnd);
            window.addEventListener('touchmove', handleMove, { passive: false });
            window.addEventListener('touchend', handleEnd);
        };

        const handleMove = (e) => {
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            const clientY = e.clientY || (e.touches && e.touches[0].clientY);
            const d = dragInfo.current;

            if (Math.abs(clientX - d.startX) > 5 || Math.abs(clientY - d.startY) > 5) {
                d.isDragging = true;
                d.hasMoved = true;
            }

            if (d.isDragging) {
                if (e.cancelable) e.preventDefault();

                let x = clientX - (d.startX - d.initialX);
                let y = clientY - (d.startY - d.initialY);

                // Boundary checks
                const maxX = window.innerWidth - container.offsetWidth;
                const maxY = window.innerHeight - container.offsetHeight;

                x = Math.max(0, Math.min(x, maxX));
                y = Math.max(0, Math.min(y, maxY));

                container.style.left = `${x}px`;
                container.style.top = `${y}px`;
                container.style.bottom = 'auto';
                container.style.right = 'auto';
            }
        };

        const handleEnd = () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleEnd);
            window.removeEventListener('touchmove', handleMove);
            window.removeEventListener('touchend', handleEnd);
        };

        container.addEventListener('mousedown', handleStart);
        container.addEventListener('touchstart', handleStart, { passive: false });

        return () => {
            container.removeEventListener('mousedown', handleStart);
            container.removeEventListener('touchstart', handleStart);
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleEnd);
        };
    }, []);

    const handleClick = () => {
        if (!dragInfo.current.hasMoved) {
            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        }
    };

    return (
        <div
            ref={containerRef}
            onClick={handleClick}
            className="fixed bottom-6 right-6 z-[99999] w-16 h-16 bg-[#25D366] rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.3)] cursor-move flex items-center justify-center select-none touch-none hover:scale-110 transition-transform duration-200"
            style={{ position: 'fixed' }}
            title="Drag me anywhere!"
        >
            <svg
                viewBox="0 0 24 24"
                width="32"
                height="32"
                fill="currentColor"
                className="text-white"
            >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
        </div>
    );
};

export default WhatsAppFloating;
