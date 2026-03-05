document.addEventListener('DOMContentLoaded', () => {
    console.log('Potdar Jewellery Website Initialized');

    // --- Cart Logic ---
    let cart = JSON.parse(localStorage.getItem('potdar_cart')) || [];

    const updateCartUI = () => {
        const cartCounts = document.querySelectorAll('.shopping-bag-count, [id^="nav-bag"] span.bg-primary, header a[href="checkout.html"] span.bg-primary');
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

        cartCounts.forEach(el => {
            el.textContent = totalItems;
            if (totalItems === 0) {
                el.classList.add('hidden');
            } else {
                el.classList.remove('hidden');
            }
        });
    };

    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('potdar_cart', JSON.stringify(cart));
        updateCartUI();

        // Premium notification instead of simple alert
        const notification = document.createElement('div');
        notification.className = 'fixed bottom-24 right-6 z-[100] bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-right duration-300';
        notification.innerHTML = `
            <div class="size-10 bg-primary/20 rounded-full flex items-center justify-center">
                <span class="material-symbols-outlined text-primary">check_circle</span>
            </div>
            <div>
                <p class="text-xs font-bold uppercase tracking-widest text-slate-400">Added to Bag</p>
                <p class="text-sm font-bold">${product.name} - ₹${product.price.toLocaleString()}</p>
            </div>
        `;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.classList.add('animate-out', 'fade-out', 'slide-out-to-right');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    };

    updateCartUI();

    // --- Modal Logic ---
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.getElementById('closeModal');

    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', () => {
            loginModal.classList.remove('hidden');
            loginModal.classList.add('flex');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeModal && loginModal) {
        closeModal.addEventListener('click', () => {
            loginModal.classList.add('hidden');
            loginModal.classList.remove('flex');
            document.body.style.overflow = '';
        });

        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                closeModal.click();
            }
        });
    }

    // --- Mobile Menu Logic ---
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Gold Rate Simulation ---
    const updateGoldRates = () => {
        const rate24k = document.querySelectorAll('.gold-rate-24k');
        const rate22k = document.querySelectorAll('.gold-rate-22k');
        const base24 = 7745;
        const base22 = 7100;
        const variation = Math.floor(Math.random() * 20) - 10;

        rate24k.forEach(el => el.textContent = `₹${(base24 + variation).toLocaleString()}/g`);
        rate22k.forEach(el => el.textContent = `₹${(base22 + (variation * 0.9)).toLocaleString()}/g`);
    };

    setInterval(updateGoldRates, 10000);
    updateGoldRates();

    // --- Add to Wishlist Sim ---
    document.querySelectorAll('.add-to-wishlist').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            btn.classList.toggle('text-red-500');
            const icon = btn.querySelector('.material-symbols-outlined');
            if (icon) {
                icon.style.fontVariationSettings = btn.classList.contains('text-red-500') ? "'FILL' 1" : "'FILL' 0";
            }
        });
    });

    // --- Bottom Nav Active State ---
    const path = window.location.pathname;
    const navLinks = {
        'index.html': 'nav-home',
        'collections.html': 'nav-collections',
        'store.html': 'nav-stores',
        'checkout.html': 'nav-bag'
    };

    const activeId = navLinks[path.split('/').pop()] || 'nav-home';
    const activeLink = document.getElementById(activeId);
    if (activeLink) {
        activeLink.classList.remove('text-slate-400');
        activeLink.classList.add('text-primary');
        const icon = activeLink.querySelector('.material-symbols-outlined');
        if (icon) icon.style.fontVariationSettings = "'FILL' 1";
    }

    // --- Products Data ---
    const products = [
        // --- EARRINGS ---
        { id: 1, name: "Morning Bloom Studs", category: "Earrings", material: "Gold", price: 18499, originalPrice: 22000, metal: "18kt Rose Gold", stones: "Diamond", rating: 4.9, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbpXoekN-b9JQV8Rll6jgeZCrnE17aMEnF83AwULNI3QI6JcFTdBhtW7ZPwFXPX7fW6oOP19yDcYWw6z-UU2j9ln51ByKJJuBiGpyLgkxfpFv1239c0h3C7OmlhRRgNFVYyUQqdpStsH9eNZmR3xw39vhJv9_j7dvxLX2ltopX1OpU__fQZV0GyXfJcZM3gkN8wtshE0jabL0V78ptmtHLa4MebY3xHaraTkeB3JUQY63ISrpjtoYUDwd_Uls0NHlZo-Q6ZAnvAf8D", tags: ["Bestseller"] },
        { id: 2, name: "Eternal Circle Hoops", category: "Earrings", material: "Gold", price: 32950, metal: "22kt Yellow Gold", stones: "None", rating: 4.8, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8MlhIVhM270HcaxsABalod3sweYgsWsiR7KcfKgZYFkQnCttxXruaQTuMN7tdBRLJm_QrjIQSh-970jMeTKHnt9QjpgQ9NvIR_HYkINYAAvQ6N4kGAXr5IurVr8nSWdQJKQUr5arNDtakwcpuV1ujU3gVHNYioa1IfGTAlcE2zvbHpMHgShql1pSnC4cYM8Jx26VLIVl7b_xna3mEFwOscio8Jko4PWbxWaO8O8Kc_DckmLdG4s-4duQrbkZdlwWQ0CTqBv4YZZNO" },
        { id: 3, name: "Royal Heritage Jhumka", category: "Earrings", material: "Gold", price: 54200, metal: "22kt Yellow Gold", stones: "Pearl", rating: 5.0, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjjLqytHCx9ttKsslJV0cGIJnpP_41nDBpEkTVfg3I90tCpXonQakxtjlTsNhsRNfVCzenW9vk_xyqERK74ia38Q5dXN_GsoBJhu9CVhN3Yk0GeYrNgnOB7uRgLPZGmcAkNiVP8ha0-Ct9u2gJ_zdga0aarbBpKxAR6EUolfxtasaS3uekWfJBfaC2zfMOwZtiZaRY3HbgheneOyYvtoRB4oADEkW6hvT-Cb_w2hSekt_5JFUyVJCAb5JvtP8dnyyZtdDtqm4k40h", tags: ["New Arrival"] },
        { id: 4, name: "Celestial Star Studs", category: "Earrings", material: "Diamond", price: 62500, metal: "14kt White Gold", stones: "Diamond", rating: 4.7, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFJqerisC2fR1FmJpeFhD7q0bnq4_22wNw5XUkc6AaffP-t1wKuQny5N3ABbmjy1EjdDhFWF1iifBuuAH47FJJBr4XFlesaEuQ0DinzCWPgRgmQ_7F4Txe4afwiH3pVjzg1TqjcDgfAFNIsmS0mwi9S_32aBO-EmepVRAGd3ce9hu_z4YcRYh4Qy6_7rttNkYCoC-yzDwyYselFcem7U7gjij4n0-CQxrL1BFVxW90S-LiqI8z8lZW9fHRM4vwl9x_oGBPU1zbt8cM" },
        { id: 5, name: "Petal Diamond Studs", category: "Earrings", material: "Diamond", price: 48990, metal: "14kt Yellow Gold", stones: "Diamond", rating: 4.8, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNVjUxk-d14OR-N5qp0MM6wvJqXP78jMrbISZVKrnWfyg_6vw4zcMhA3qQvcP8yjdOU5PmuTaY11u0KqYysQMXSuhq12dC99nJei3E_Ivbs7mbEQ-gnS64VWEORBl1mUBd0z_8yAL7__eHtzNHZC6OQ6QG8uSBQs6XeeCgomNvecx5NclZK7KxAZR2dyGJ4g0nrFeK76EsTmkS5WKzzzJXBShQe9fI2c4VxAGpVttlI1iyvJALi_kjzL4K0gjFjLNEnE51vwLeNhDd" },
        { id: 6, name: "Simple Pearl Studs", category: "Earrings", material: "Gold", price: 8500, metal: "22kt Yellow Gold", stones: "Pearl", rating: 4.5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOtMmf8CBVWbmnoObmgawpH8rIWzgHYhpDRJu5zKsE0_4B5ai5Y-lqn1e5Yd82ATHrhjlFGwS2PYHxZ0yud-I7cDkutVdn6-nyr5YxY7Rvm3-HSFGQtcftDTwzWiLhes1_0E7baGYL-JWpHJP-vLeXKdhKxo1O5Pjb5SaXCX2WuIFhTh9ZiuzRSLs_rxAloWKuqi_QdeKT0DASiGQSKkjHV-JEMhSv33eXXWD51ml6L7NG_db_BKrButt4I-dlDZOm7Narcp8cXa6t" },

        // --- NECKLACES ---
        { id: 7, name: "Graceful Gardenia Necklace", category: "Necklaces", material: "Diamond", price: 125000, metal: "18kt Rose Gold", stones: "Diamond", rating: 5.0, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8gzEBuaYbPkYicD53yFB11XGoLwijU-zQxQNPHvL1VQPcYhXmN2_7JaIGMbFU465FoWgHJxvE-Y_DD1-xY5lpmkf8wz4J7u7uoqk9omKWfXXSVV292hNaQfUDhqlrLPGyLHjjTZtgRFg9hS41WmvA38hHHq6LMNA7acoGKFr5dBt9oLtkZ7AuAa4gBFbaeihLAx5-l97iLgcLTeU9B65ikr7jTewtQSCruQBMBjG0q0l3grTJzoYk1KpT2ngD4HtlQpjzHgd2eiVd", tags: ["Limited Edition"] },
        { id: 8, name: "Classic Pearl String", category: "Necklaces", material: "Gold", price: 35000, metal: "14kt Yellow Gold", stones: "Basra Pearl", rating: 4.8, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1WJ4Esj9yscHB1URg0KoK9F4J23nvpbeIGi7Ys9e_Gpi_T8-3fx8iV8zFW6dlvAUIq99utOZh-aHL2wUgXqzaBeD3cx_1BKbDCeTRGwE7RYEpbcb9ZgzPqYFaNtpvdHdqvBUuGBK8BNgDzsXej6Yquh4ci16eAbjPLLQmHPoq_S0hXBToupgZRPhNiIYSsVtGVPzKGdjEOKckbYGWfbRI2-oYdFv6Sm-Ij68gu0D26J45GsfLRKLqTZNtvfnMPKIe2VeO0QN3IrKc" },
        { id: 9, name: "Temple Bloom Choker", category: "Necklaces", material: "Gold", price: 88500, metal: "22kt Yellow Gold", stones: "Ruby", rating: 4.9, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-u39JvOPbp0-5LbmMtnEOvQ_Zsbp7NkE3rqoCKd1dvudjuzqCFPusv0pVP7vSqksKqjvJu5D-rnVOSUgrPhWg_TnU5cJ_Ukf4iLKYoKAub1Z7cEcj4AboIuQ2s3uMAVox2mXj1eVFilgiCDZLhF8GqsgMO9BQjWZ0XB5YchxLslSvpqLSXOKX3nSNsOpYvBzcpFfN7TUHl8rroRcPotH_vEtxCoquYcMfMVmkO-tVbrMrkEWlOw3pvWy-qWAamDXnxj_WjyPz1fY4" },
        { id: 10, name: "Infinity Diamond Drop", category: "Necklaces", material: "Diamond", price: 95000, metal: "18kt White Gold", stones: "Diamond", rating: 5.0, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBd4t_CAuUBCRXLCFtplg-8SBgEVNzwtR7VpuBmdDmEwBi_9YEXpzoJChMt2qWZfiHjLKR1wdEa6BiwElKjUhHxomV5oRc3-ehmOw5TgdvSIuivI4QHKsu4Ic88oH4adNWacvchXquX0JYA2FPe6UdPsOuM0yPk7G89dCheMbY_emIGcIH_eoaV3nErjmRnAy4Rw8Ldvt6b4QtFgcZnvqVYSJmk8zn-LhEp533FCPmz6rMFc9kccR89e0SvlDtqy9vc-lSazKJKBVXc" },

        // --- MANGALSUTRA ---
        { id: 11, name: "Modern Knot Mangalsutra", category: "Mangalsutra", material: "Diamond", price: 45000, metal: "18kt Yellow Gold", stones: "Diamond", rating: 4.9, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCX5rp_ArsGooxZMJce0titvJBXa0PYgjxORaaxhBWNitzWa2piBaWKoqKgi3u4Ar4JDaPrETAYZ7foYz87n-Np5BwH29ZFTQMft6ebD-xH_Z39yg_kSW91yMJ8sAnZcN2Al94j5A4vJsaOJt0DcEh3hgPAJ03C4Wm-UKORE-oN1F4cQC3g-CIPjG1f7a1-C3UmNrveHDoh7XBVbqL9JzS5vWDxXv9Hr-ojKjjz48n0jGfzjRMB968XA6yGi7Z7qHo4cFNMh7Woc4I-" },
        { id: 12, name: "Legacy Gold Mangalsutra", category: "Mangalsutra", material: "Gold", price: 72000, metal: "22kt Yellow Gold", stones: "None", rating: 4.9, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWQmpo2xDV0lVXknPKPH1GvfGDNXW1YP7QU8VVi471UGq-WfBqJBMTvpQhyw8hGXerx3XDW7DRhPBdL8M6xu4BBpdmDI8CqtDIi7JGe1CXrf2Pb7R71kJa_9Hqvx5vb12qucTrhIwUH07JmvBN7zD-t2p05d4xlP61N7skFUoYqD4Qdmh5aH_WYEU4JHNYzx9MeH2IrquR8dVLi5nMpaXkiMUv0Vbdfk2FuSEblcY-ZuzcMGJoogiR48ZjDvEH7lOT-XogrAHcHXJA" },
        { id: 13, name: "Petite Diamond Wati", category: "Mangalsutra", material: "Diamond", price: 29500, metal: "18kt Yellow Gold", stones: "Diamond", rating: 4.8, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCX5rp_ArsGooxZMJce0titvJBXa0PYgjxORaaxhBWNitzWa2piBaWKoqKgi3u4Ar4JDaPrETAYZ7foYz87n-Np5BwH29ZFTQMft6ebD-xH_Z39yg_kSW91yMJ8sAnZcN2Al94j5A4vJsaOJt0DcEh3hgPAJ03C4Wm-UKORE-oN1F4cQC3g-CIPjG1f7a1-C3UmNrveHDoh7XBVbqL9JzS5vWDxXv9Hr-ojKjjz48n0jGfzjRMB968XA6yGi7Z7qHo4cFNMh7Woc4I-" },

        // --- RINGS ---
        { id: 14, name: "Infinity Love Band", category: "Rings", material: "Diamond", price: 15400, metal: "18kt Rose Gold", stones: "Diamond", rating: 4.8, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkzb69-5kQELNIirSZVPEhxH1f1Roqm_NTVFSi4jDPVd6SosUDruDqDLFR1qqPUIj313BAMI_9CFE26WcQlzd4q6ceeZNfpUw26fmuB3JqFz1IRAaiXMrmzX3FW7DepVqRPrbHGkNgFhr_UUOEEqEihhk2c7EF6VGdIVJQb91ALNY8vVoAibo9vtJgsYh3ErZWB0WYeBxg1M4WYiIuMRIJRcm2hU4vtDIDryLLY75Daur0Q1-tOaJb2lM3vPuwf9M3qBmpUM_TyosN" },
        { id: 15, name: "Solitaire Engagement Ring", category: "Rings", material: "Diamond", price: 115000, metal: "18kt White Gold", stones: "Solitaire", rating: 5.0, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcpifZXlkXh48Dvp6Kat2LxrTskIjZlYJNzrSPk_vy2qk2Ry4Uchoyo8aMTyoMtl36E9Gj37awVc753CDK9Zpesx6XNeewCuuuyfAHCLBR34_4BxMRxIuBGDJWYAv0gTKaYP1FaSXSGct4w9yJwmDOcoA2e3LX4AGvKk0dt_3O_G9hrRTfjfhohgKWzwFzZ1RWdX2iIJuhGhcjYFkctTHwkRPCuH0A1iDjfDxROmkedW8SIiDprJeb2ax0sekUYlewdgH5Ffr9BR8O" },
        { id: 16, name: "Classic Gold Signet", category: "Rings", material: "Gold", price: 28000, metal: "22kt Yellow Gold", stones: "None", rating: 4.7, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBd4t_CAuUBCRXLCFtplg-8SBgEVNzwtR7VpuBmdDmEwBi_9YEXpzoJChMt2qWZfiHjLKR1wdEa6BiwElKjUhHxomV5oRc3-ehmOw5TgdvSIuivI4QHKsu4Ic88oH4adNWacvchXquX0JYA2FPe6UdPsOuM0yPk7G89dCheMbY_emIGcIH_eoaV3nErjmRnAy4Rw8Ldvt6b4QtFgcZnvqVYSJmk8zn-LhEp533FCPmz6rMFc9kccR89e0SvlDtqy9vc-lSazKJKBVXc" },
        { id: 17, name: "Emerald Royale Ring", category: "Rings", material: "Gold", price: 42000, metal: "18kt Yellow Gold", stones: "Emerald", rating: 4.8, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcpifZXlkXh48Dvp6Kat2LxrTskIjZlYJNzrSPk_vy2qk2Ry4Uchoyo8aMTyoMtl36E9Gj37awVc753CDK9Zpesx6XNeewCuuuyfAHCLBR34_4BxMRxIuBGDJWYAv0gTKaYP1FaSXSGct4w9yJwmDOcoA2e3LX4AGvKk0dt_3O_G9hrRTfjfhohgKWzwFzZ1RWdX2iIJuhGhcjYFkctTHwkRPCuH0A1iDjfDxROmkedW8SIiDprJeb2ax0sekUYlewdgH5Ffr9BR8O" },

        // --- BANGLES ---
        { id: 18, name: "Filigree Gold Bangles", category: "Bangles", material: "Gold", price: 85000, metal: "22kt Yellow Gold", stones: "None", rating: 4.9, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsot7wJJLsn0La3WC7QLLWrQKJxjSP6Z9DSZOxOcX96ENjYOh-vIctnsmd41zn32wqOLicR11BeUwLqyQeJQoerP-ml-k1C-BbDL46R7Y9REiSQfTvh-oor_rdJ_Yl4yU_wh-b4QfoqHZFRyGccF1YQaCIiAlMoTy51uCTsqLoG6dzii1l5CrmEh0sTTeIwCYd90VwXu7UnSn8Z2_kmmfRWfv3Cs59xpBUvx3DOSzbUIYMvvAremYb3iWuhQN9aQ6v9HvD49-OsVZk" },
        { id: 19, name: "Diamond Kada", category: "Bangles", material: "Diamond", price: 155000, metal: "18kt Yellow Gold", stones: "Diamond", rating: 5.0, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkzb69-5kQELNIirSZVPEhxH1f1Roqm_NTVFSi4jDPVd6SosUDruDqDLFR1qqPUIj313BAMI_9CFE26WcQlzd4q6ceeZNfpUw26fmuB3JqFz1IRAaiXMrmzX3FW7DepVqRPrbHGkNgFhr_UUOEEqEihhk2c7EF6VGdIVJQb91ALNY8vVoAibo9vtJgsYh3ErZWB0WYeBxg1M4WYiIuMRIJRcm2hU4vtDIDryLLY75Daur0Q1-tOaJb2lM3vPuwf9M3qBmpUM_TyosN" },
        { id: 20, name: "Polki Heritage Bangle", category: "Bangles", material: "Gold", price: 210000, metal: "22kt Yellow Gold", stones: "Uncut Diamond", rating: 4.9, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8gzEBuaYbPkYicD53yFB11XGoLwijU-zQxQNPHvL1VQPcYhXmN2_7JaIGMbFU465FoWgHJxvE-Y_DD1-xY5lpmkf8wz4J7u7uoqk9omKWfXXSVV292hNaQfUDhqlrLPGyLHjjTZtgRFg9hS41WmvA38hHHq6LMNA7acoGKFr5dBt9oLtkZ7AuAa4gBFbaeihLAx5-l97iLgcLTeU9B65ikr7jTewtQSCruQBMBjG0q0l3grTJzoYk1KpT2ngD4HtlQpjzHgd2eiVd" },
        { id: 21, name: "Floral Gold Bangle", category: "Bangles", material: "Gold", price: 42500, metal: "22kt Yellow Gold", stones: "None", rating: 4.8, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsot7wJJLsn0La3WC7QLLWrQKJxjSP6Z9DSZOxOcX96ENjYOh-vIctnsmd41zn32wqOLicR11BeUwLqyQeJQoerP-ml-k1C-BbDL46R7Y9REiSQfTvh-oor_rdJ_Yl4yU_wh-b4QfoqHZFRyGccF1YQaCIiAlMoTy51uCTsqLoG6dzii1l5CrmEh0sTTeIwCYd90VwXu7UnSn8Z2_kmmfRWfv3Cs59xpBUvx3DOSzbUIYMvvAremYb3iWuhQN9aQ6v9HvD49-OsVZk" },
        { id: 22, name: "Modern Mesh Bangle", category: "Bangles", material: "Gold", price: 31000, metal: "18kt Yellow Gold", stones: "None", rating: 4.6, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOtMmf8CBVWbmnoObmgawpH8rIWzgHYhpDRJu5zKsE0_4B5ai5Y-lqn1e5Yd82ATHrhjlFGwS2PYHxZ0yud-I7cDkutVdn6-nyr5YxY7Rvm3-HSFGQtcftDTwzWiLhes1_0E7baGYL-JWpHJP-vLeXKdhKxo1O5Pjb5SaXCX2WuIFhTh9ZiuzRSLs_rxAloWKuqi_QdeKT0DASiGQSKkjHV-JEMhSv33eXXWD51ml6L7NG_db_BKrButt4I-dlDZOm7Narcp8cXa6t" },

        // --- MANGALSUTRA (More) ---
        { id: 23, name: "Divine Flower Mangalsutra", category: "Mangalsutra", material: "Gold", price: 58900, metal: "22kt Yellow Gold", stones: "None", rating: 4.9, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWQmpo2xDV0lVXknPKPH1GvfGDNXW1YP7QU8VVi471UGq-WfBqJBMTvpQhyw8hGXerx3XDW7DRhPBdL8M6xu4BBpdmDI8CqtDIi7JGe1CXrf2Pb7R71kJa_9Hqvx5vb12qucTrhIwUH07JmvBN7zD-t2p05d4xlP61N7skFUoYqD4Qdmh5aH_WYEU4JHNYzx9MeH2IrquR8dVLi5nMpaXkiMUv0Vbdfk2FuSEblcY-ZuzcMGJoogiR48ZjDvEH7lOT-XogrAHcHXJA" },
        { id: 24, name: "Elegant Bead Mangalsutra", category: "Mangalsutra", material: "Gold", price: 24500, metal: "22kt Yellow Gold", stones: "None", rating: 4.7, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCX5rp_ArsGooxZMJce0titvJBXa0PYgjxORaaxhBWNitzWa2piBaWKoqKgi3u4Ar4JDaPrETAYZ7foYz87n-Np5BwH29ZFTQMft6ebD-xH_Z39yg_kSW91yMJ8sAnZcN2Al94j5A4vJsaOJt0DcEh3hgPAJ03C4Wm-UKORE-oN1F4cQC3g-CIPjG1f7a1-C3UmNrveHDoh7XBVbqL9JzS5vWDxXv9Hr-ojKjjz48n0jGfzjRMB968XA6yGi7Z7qHo4cFNMh7Woc4I-" },

        // --- RINGS (More) ---
        { id: 25, name: "Vintage Emerald Band", category: "Rings", material: "Gold", price: 38200, metal: "18kt Yellow Gold", stones: "Emerald", rating: 4.8, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkzb69-5kQELNIirSZVPEhxH1f1Roqm_NTVFSi4jDPVd6SosUDruDqDLFR1qqPUIj313BAMI_9CFE26WcQlzd4q6ceeZNfpUw26fmuB3JqFz1IRAaiXMrmzX3FW7DepVqRPrbHGkNgFhr_UUOEEqEihhk2c7EF6VGdIVJQb91ALNY8vVoAibo9vtJgsYh3ErZWB0WYeBxg1M4WYiIuMRIJRcm2hU4vtDIDryLLY75Daur0Q1-tOaJb2lM3vPuwf9M3qBmpUM_TyosN" },
        { id: 26, name: "Modern Geometric Ring", category: "Rings", material: "Gold", price: 18500, metal: "14kt Yellow Gold", stones: "None", rating: 4.5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcpifZXlkXh48Dvp6Kat2LxrTskIjZlYJNzrSPk_vy2qk2Ry4Uchoyo8aMTyoMtl36E9Gj37awVc753CDK9Zpesx6XNeewCuuuyfAHCLBR34_4BxMRxIuBGDJWYAv0gTKaYP1FaSXSGct4w9yJwmDOcoA2e3LX4AGvKk0dt_3O_G9hrRTfjfhohgKWzwFzZ1RWdX2iIJuhGhcjYFkctTHwkRPCuH0A1iDjfDxROmkedW8SIiDprJeb2ax0sekUYlewdgH5Ffr9BR8O" },
        { id: 27, name: "Sapphire Dream Ring", category: "Rings", material: "Diamond", price: 65000, metal: "18kt White Gold", stones: "Sapphire", rating: 4.9, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcpifZXlkXh48Dvp6Kat2LxrTskIjZlYJNzrSPk_vy2qk2Ry4Uchoyo8aMTyoMtl36E9Gj37awVc753CDK9Zpesx6XNeewCuuuyfAHCLBR34_4BxMRxIuBGDJWYAv0gTKaYP1FaSXSGct4w9yJwmDOcoA2e3LX4AGvKk0dt_3O_G9hrRTfjfhohgKWzwFzZ1RWdX2iIJuhGhcjYFkctTHwkRPCuH0A1iDjfDxROmkedW8SIiDprJeb2ax0sekUYlewdgH5Ffr9BR8O" },
        { id: 28, name: "Braided Gold Band", category: "Rings", material: "Gold", price: 12500, metal: "22kt Yellow Gold", stones: "None", rating: 4.6, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkzb69-5kQELNIirSZVPEhxH1f1Roqm_NTVFSi4jDPVd6SosUDruDqDLFR1qqPUIj313BAMI_9CFE26WcQlzd4q6ceeZNfpUw26fmuB3JqFz1IRAaiXMrmzX3FW7DepVqRPrbHGkNgFhr_UUOEEqEihhk2c7EF6VGdIVJQb91ALNY8vVoAibo9vtJgsYh3ErZWB0WYeBxg1M4WYiIuMRIJRcm2hU4vtDIDryLLY75Daur0Q1-tOaJb2lM3vPuwf9M3qBmpUM_TyosN" },

        // --- NECKLACES (Even More) ---
        { id: 29, name: "Royal Kundan Set", category: "Necklaces", material: "Gold", price: 285000, metal: "22kt Yellow Gold", stones: "Kundan & Ruby", rating: 5.0, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8gzEBuaYbPkYicD53yFB11XGoLwijU-zQxQNPHvL1VQPcYhXmN2_7JaIGMbFU465FoWgHJxvE-Y_DD1-xY5lpmkf8wz4J7u7uoqk9omKWfXXSVV292hNaQfUDhqlrLPGyLHjjTZtgRFg9hS41WmvA38hHHq6LMNA7acoGKFr5dBt9oLtkZ7AuAa4gBFbaeihLAx5-l97iLgcLTeU9B65ikr7jTewtQSCruQBMBjG0q0l3grTJzoYk1KpT2ngD4HtlQpjzHgd2eiVd" },
        { id: 30, name: "Geometric Gold Choker", category: "Necklaces", material: "Gold", price: 110000, metal: "22kt Yellow Gold", stones: "None", rating: 4.8, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBd4t_CAuUBCRXLCFtplg-8SBgEVNzwtR7VpuBmdDmEwBi_9YEXpzoJChMt2qWZfiHjLKR1wdEa6BiwElKjUhHxomV5oRc3-ehmOw5TgdvSIuivI4QHKsu4Ic88oH4adNWacvchXquX0JYA2FPe6UdPsOuM0yPk7G89dCheMbY_emIGcIH_eoaV3nErjmRnAy4Rw8Ldvt6b4QtFgcZnvqVYSJmk8zn-LhEp533FCPmz6rMFc9kccR89e0SvlDtqy9vc-lSazKJKBVXc" },

        // --- BANGLES (Final) ---
        { id: 31, name: "Traditional Shankha Bangle", category: "Bangles", material: "Gold", price: 18500, metal: "22kt Yellow Gold", stones: "None", rating: 4.7, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsot7wJJLsn0La3WC7QLLWrQKJxjSP6Z9DSZOxOcX96ENjYOh-vIctnsmd41zn32wqOLicR11BeUwLqyQeJQoerP-ml-k1C-BbDL46R7Y9REiSQfTvh-oor_rdJ_Yl4yU_wh-b4QfoqHZFRyGccF1YQaCIiAlMoTy51uCTsqLoG6dzii1l5CrmEh0sTTeIwCYd90VwXu7UnSn8Z2_kmmfRWfv3Cs59xpBUvx3DOSzbUIYMvvAremYb3iWuhQN9aQ6v9HvD49-OsVZk" },
        { id: 32, name: "Wave Diamond Bangle", category: "Bangles", material: "Diamond", price: 89000, metal: "18kt White Gold", stones: "Diamond", rating: 4.9, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkzb69-5kQELNIirSZVPEhxH1f1Roqm_NTVFSi4jDPVd6SosUDruDqDLFR1qqPUIj313BAMI_9CFE26WcQlzd4q6ceeZNfpUw26fmuB3JqFz1IRAaiXMrmzX3FW7DepVqRPrbHGkNgFhr_UUOEEqEihhk2c7EF6VGdIVJQb91ALNY8vVoAibo9vtJgsYh3ErZWB0WYeBxg1M4WYiIuMRIJRcm2hU4vtDIDryLLY75Daur0Q1-tOaJb2lM3vPuwf9M3qBmpUM_TyosN" },

        // --- WORKWEAR (Final) ---
        { id: 101, name: "Minima Gold Hoops", category: "Workwear", material: "Gold", price: 4500, metal: "18kt Yellow Gold", stones: "None", rating: 4.7, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbpXoekN-b9JQV8Rll6jgeZCrnE17aMEnF83AwULNI3QI6JcFTdBhtW7ZPwFXPX7fW6oOP19yDcYWw6z-UU2j9ln51ByKJJuBiGpyLgkxfpFv1239c0h3C7OmlhRRgNFVYyUQqdpStsH9eNZmR3xw39vhJv9_j7dvxLX2ltopX1OpU__fQZV0GyXfJcZM3gkN8wtshE0jabL0V78ptmtHLa4MebY3xHaraTkeB3JUQY63ISrpjtoYUDwd_Uls0NHlZo-Q6ZAnvAf8D" },
        { id: 102, name: "Sleek Office Band", category: "Workwear", material: "Gold", price: 8200, metal: "14kt Rose Gold", stones: "None", rating: 4.9, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkzb69-5kQELNIirSZVPEhxH1f1Roqm_NTVFSi4jDPVd6SosUDruDqDLFR1qqPUIj313BAMI_9CFE26WcQlzd4q6ceeZNfpUw26fmuB3JqFz1IRAaiXMrmzX3FW7DepVqRPrbHGkNgFhr_UUOEEqEihhk2c7EF6VGdIVJQb91ALNY8vVoAibo9vtJgsYh3ErZWB0WYeBxg1M4WYiIuMRIJRcm2hU4vtDIDryLLY75Daur0Q1-tOaJb2lM3vPuwf9M3qBmpUM_TyosN" },
        { id: 103, name: "Professional Studs", category: "Workwear", material: "Diamond", price: 12400, metal: "18kt White Gold", stones: "Diamond", rating: 5.0, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFJqerisC2fR1FmJpeFhD7q0bnq4_22wNw5XUkc6AaffP-t1wKuQny5N3ABbmjy1EjdDhFWF1iifBuuAH47FJJBr4XFlesaEuQ0DinzCWPgRgmQ_7F4Txe4afwiH3pVjzg1TqjcDgfAFNIsmS0mwi9S_32aBO-EmepVRAGd3ce9hu_z4YcRYh4Qy6_7rttNkYCoC-yzDwyYselFcem7U7gjij4n0-CQxrL1BFVxW90S-LiqI8z8lZW9fHRM4vwl9x_oGBPU1zbt8cM" },
        { id: 104, name: "Modern Bar Necklace", category: "Workwear", material: "Gold", price: 15600, metal: "18kt Yellow Gold", stones: "None", rating: 4.8, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkzb69-5kQELNIirSZVPEhxH1f1Roqm_NTVFSi4jDPVd6SosUDruDqDLFR1qqPUIj313BAMI_9CFE26WcQlzd4q6ceeZNfpUw26fmuB3JqFz1IRAaiXMrmzX3FW7DepVqRPrbHGkNgFhr_UUOEEqEihhk2c7EF6VGdIVJQb91ALNY8vVoAibo9vtJgsYh3ErZWB0WYeBxg1M4WYiIuMRIJRcm2hU4vtDIDryLLY75Daur0Q1-tOaJb2lM3vPuwf9M3qBmpUM_TyosN" },
        { id: 105, name: "Tiny Diamond Pendant", category: "Workwear", material: "Diamond", price: 9800, metal: "18kt White Gold", stones: "Diamond", rating: 4.9, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBd4t_CAuUBCRXLCFtplg-8SBgEVNzwtR7VpuBmdDmEwBi_9YEXpzoJChMt2qWZfiHjLKR1wdEa6BiwElKjUhHxomV5oRc3-ehmOw5TgdvSIuivI4QHKsu4Ic88oH4adNWacvchXquX0JYA2FPe6UdPsOuM0yPk7G89dCheMbY_emIGcIH_eoaV3nErjmRnAy4Rw8Ldvt6b4QtFgcZnvqVYSJmk8zn-LhEp533FCPmz6rMFc9kccR89e0SvlDtqy9vc-lSazKJKBVXc" }
    ];


    const renderProducts = (filteredProducts) => {
        const grid = document.getElementById('productGrid');
        const countEl = document.getElementById('productCount');
        if (!grid) return;

        if (countEl) countEl.textContent = filteredProducts.length;

        if (filteredProducts.length === 0) {
            grid.innerHTML = `<div class="col-span-full py-24 text-center space-y-4">
                <div class="size-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                    <span class="material-symbols-outlined text-4xl">search_off</span>
                </div>
                <h3 class="text-xl font-bold text-slate-900">No matching designs found</h3>
                <p class="text-slate-400 text-sm max-w-xs mx-auto">Try adjusting your filters or browse our other collections.</p>
                <button onclick="window.location.href='collections.html'" class="text-primary font-bold text-sm uppercase tracking-widest mt-4">Clear All Filters</button>
            </div>`;
            return;
        }

        grid.innerHTML = filteredProducts.map(p => `
            <div class="product-card group cursor-pointer animate-fade-in" onclick="window.location.href='product.html'">
                <div class="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-sm">
                    ${p.tags ? p.tags.map(tag => `<span class="absolute top-6 left-6 z-10 bg-primary text-white text-[9px] font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">${tag}</span>`).join('') : ''}
                    <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="${p.image}" alt="${p.name}"/>
                    <div class="quick-view absolute inset-x-0 bottom-0 p-6 opacity-0 translate-y-4 transition-all duration-300">
                        <button class="w-full bg-primary text-white font-bold py-4 rounded-2xl text-xs uppercase tracking-widest shadow-2xl add-to-cart-dynamic" data-id="${p.id}">Add to Bag</button>
                    </div>
                </div>
                <div class="p-4 space-y-2">
                    <div class="flex justify-between items-start">
                        <h3 class="text-slate-900 font-bold text-lg leading-tight text-ellipsis overflow-hidden whitespace-nowrap">${p.name}</h3>
                        <div class="flex items-center text-amber-400 text-xs font-bold gap-1 mt-1">
                            <span class="material-symbols-outlined text-sm fill-1">star</span> ${p.rating}
                        </div>
                    </div>
                    <p class="text-slate-400 text-xs font-medium">${p.metal} • ${p.stones}</p>
                    <div class="flex items-center gap-3 pt-1">
                        <span class="text-primary font-bold text-xl">₹${p.price.toLocaleString()}</span>
                        ${p.originalPrice ? `<span class="text-slate-300 line-through text-sm">₹${p.originalPrice.toLocaleString()}</span>` : ''}
                    </div>
                </div>
            </div>
        `).join('');

        // Re-attach add-to-cart listeners
        grid.querySelectorAll('.add-to-cart-dynamic').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const pid = parseInt(btn.getAttribute('data-id'));
                const product = products.find(p => p.id === pid);
                if (product) addToCart(product);
            });
        });
    };

    // --- Static Buttons Listener ---
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            try {
                e.stopPropagation();
                const card = btn.closest('.product-card') || btn.closest('div.lg\\:col-span-12') || document;
                const name = card.querySelector('h4, h2, h3')?.textContent.trim() || "Exquisite Jewellery";
                const priceEl = card.querySelector('.text-primary');
                const priceText = priceEl ? priceEl.textContent.replace(/[^0-9]/g, '') : "0";
                const price = parseInt(priceText) || 0;

                let product = products.find(p => p.name === name);
                if (!product) {
                    product = { id: Date.now(), name: name, price: price, image: card.querySelector('img')?.src || "" };
                }
                addToCart(product);
            } catch (err) {
                console.error('Error adding to cart:', err);
            }
        });
    });

    // --- Filtering & Sorting Controller ---
    const urlParams = new URLSearchParams(window.location.search);
    let currentCategory = urlParams.get('category') || 'All';
    let currentMaterial = urlParams.get('material') || 'All';
    let currentSort = 'Popularity';
    let currentPriceRanges = [];

    const handleSortAndFilter = () => {
        try {
            console.log(`Filtering products: Category=${currentCategory}, Material=${currentMaterial}`);
            let filtered = [...products];

            // 1. Material Filter
            if (currentMaterial.toLowerCase() !== 'all') {
                filtered = filtered.filter(p => p.material && p.material.toLowerCase() === currentMaterial.toLowerCase());
            }

            // 2. Category Filter
            if (currentCategory.toLowerCase() !== 'all' && currentCategory.toLowerCase() !== 'collections') {
                filtered = filtered.filter(p => p.category && p.category.toLowerCase() === currentCategory.toLowerCase());
            }

            // 3. Price Filter
            if (currentPriceRanges.length > 0) {
                filtered = filtered.filter(p => {
                    return currentPriceRanges.some(range => {
                        if (typeof range !== 'string') return false;
                        if (range.includes('Under ₹10,000')) return p.price < 10000;
                        if (range.includes('₹10,000 - ₹25,000')) return p.price >= 10000 && p.price <= 25000;
                        if (range.includes('₹25,000 - ₹50,000')) return p.price > 25000 && p.price <= 50000;
                        if (range.includes('Over ₹50,000')) return p.price > 50000;
                        return true;
                    });
                });
            }

            // 4. Sorting
            if (currentSort === 'Price: Low to High') {
                filtered.sort((a, b) => a.price - b.price);
            } else if (currentSort === 'Price: High to Low') {
                filtered.sort((a, b) => b.price - a.price);
            } else if (currentSort === 'Newest First') {
                filtered.sort((a, b) => b.id - a.id);
            }

            renderProducts(filtered);
        } catch (err) {
            console.error('Error in handleSortAndFilter:', err);
        }
    };

    if (document.getElementById('productGrid')) {
        const sortSelect = document.getElementById('productSort');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                currentSort = e.target.value;
                handleSortAndFilter();
            });
        }

        // Sidebar Category Links
        document.querySelectorAll('.cat-filter').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                currentCategory = link.getAttribute('data-category');
                currentMaterial = 'All'; // Reset material when clicking specific categories

                const titleNode = document.getElementById('categoryTitle');
                if (titleNode) titleNode.textContent = currentCategory + ' Collection';

                handleSortAndFilter();

                document.querySelectorAll('.cat-filter').forEach(l => l.classList.remove('text-primary', 'font-bold'));
                link.classList.add('text-primary', 'font-bold');
            });
        });

        // Price Checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const label = checkbox.nextElementSibling.textContent.trim();
                if (checkbox.checked) {
                    currentPriceRanges.push(label);
                } else {
                    currentPriceRanges = currentPriceRanges.filter(r => r !== label);
                }
                handleSortAndFilter();
            });
        });

        // Initial Layout based on URL Params
        const initialTitle = document.getElementById('categoryTitle');
        if (initialTitle) {
            if (currentMaterial !== 'All') {
                initialTitle.textContent = currentMaterial + ' Collection';
            } else {
                initialTitle.textContent = currentCategory + ' Collection';
            }
        }

        // Sync Sidebar UI
        document.querySelectorAll('.cat-filter').forEach(l => {
            if (l.getAttribute('data-category') === currentCategory) {
                l.classList.add('text-primary', 'font-bold');
            }
        });

        handleSortAndFilter();
    }

    // --- Checkout Page Logic ---
    if (path.includes('checkout.html')) {
        const cartSummary = document.querySelector('aside .space-y-6');
        const subtotalEl = document.querySelector('aside .text-slate-500:nth-child(1) span:nth-child(2)');
        const gstEl = document.querySelector('aside .text-slate-500:nth-child(3) span:nth-child(2)');
        const totalEl = document.querySelector('aside .text-primary.text-3xl');

        if (cartSummary && cart.length > 0) {
            cartSummary.innerHTML = cart.map(item => `
                <div class="flex gap-6">
                    <div class="size-20 bg-slate-50 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-100">
                        <img class="w-full h-full object-cover" src="${item.image}" />
                    </div>
                    <div class="flex-1 flex flex-col justify-between py-1">
                        <div>
                            <h3 class="font-bold text-sm">${item.name}</h3>
                            <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">${item.quantity} x ₹${item.price.toLocaleString()}</p>
                        </div>
                        <p class="text-sm font-bold text-primary">₹${(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                </div>
            `).join('');

            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const gst = Math.round(subtotal * 0.03);
            const total = subtotal + gst;

            if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString()}`;
            if (gstEl) gstEl.textContent = `₹${gst.toLocaleString()}`;
            if (totalEl) totalEl.textContent = `₹${total.toLocaleString()}`;
        } else if (cartSummary && cart.length === 0) {
            cartSummary.innerHTML = `<p class="text-center text-slate-400 py-10">Your bag is empty.</p>`;
            if (subtotalEl) subtotalEl.textContent = `₹0`;
            if (gstEl) gstEl.textContent = `₹0`;
            if (totalEl) totalEl.textContent = `₹0`;
        }
    }
});
