// HTML Escaper for XSS Mitigation
function escapeHTML(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. Cursor Glow — Sage-tinted, smooth follow
  // ==========================================
  const cursorGlow = document.getElementById("cursorGlow");
  const hasReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (cursorGlow && !hasReducedMotion) {
    let cursorX = 0,
      cursorY = 0;
    let glowX = 0,
      glowY = 0;

    document.addEventListener("mousemove", (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
    });

    // Smooth follow with 80ms lag
    const animateCursor = () => {
      glowX += (cursorX - glowX) * 0.08;
      glowY += (cursorY - glowY) * 0.08;
      cursorGlow.style.left = `${glowX - 120}px`;
      cursorGlow.style.top = `${glowY - 120}px`;
      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Scale cursor on hoverable elements
    const hoverTargets = document.querySelectorAll(
      "a, button, .product-card, .concern-btn, .science-card, .series-card, .byos-product-tile",
    );
    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorGlow.style.width = "340px";
        cursorGlow.style.height = "340px";
        cursorGlow.style.opacity = "0.7";
      });
      el.addEventListener("mouseleave", () => {
        cursorGlow.style.width = "240px";
        cursorGlow.style.height = "240px";
        cursorGlow.style.opacity = "0.5";
      });
    });
  } else if (cursorGlow) {
    cursorGlow.style.display = "none";
  }

  // ==========================================
  // 2. Navbar — Scroll State + Glass Morphism
  // ==========================================
  const navbar = document.getElementById("navbar");
  const announcementBar = document.querySelector(".announcement-bar");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // Hide announcement bar on scroll
    if (scrollY > 60) {
      if (navbar) navbar.classList.add("scrolled");
      if (announcementBar) {
        announcementBar.style.transform = "translateY(-100%)";
        announcementBar.style.transition = "transform 0.3s ease";
      }
    } else {
      if (navbar) navbar.classList.remove("scrolled");
      if (announcementBar) {
        announcementBar.style.transform = "translateY(0)";
        announcementBar.style.transition = "transform 0.3s ease";
      }
    }
  });

  // ==========================================
  // 3. Scroll Reveal — IntersectionObserver
  // ==========================================
  const revealElements = document.querySelectorAll(".reveal, .reveal-stagger");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -60px 0px",
    },
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // ==========================================
  // 4. Hero Text Entrance — Staggered Reveal
  // ==========================================
  const heroLines = document.querySelectorAll(".hero-line");

  if (heroLines.length > 0) {
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            heroLines.forEach((line, i) => {
              setTimeout(() => {
                line.classList.add("visible");
              }, i * 150);
            });
            heroObserver.disconnect();
          }
        });
      },
      { threshold: 0.2 },
    );

    heroObserver.observe(heroLines[0]);
  }

  // ==========================================
  // 6. Counter Animation — Science Section
  // ==========================================
  const scienceCards = document.querySelectorAll(".science-card");

  if (scienceCards.length > 0) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target;
            card.classList.add("visible");

            // Animate all counter values inside the card
            const counterEls = card.querySelectorAll(".counter-value");
            counterEls.forEach((counterEl) => {
              const target = parseFloat(counterEl.dataset.countTarget) || parseFloat(card.dataset.countTarget) || 0;
              if (!counterEl.dataset.animated) {
                counterEl.dataset.animated = "true";
                animateCounter(counterEl, target, 1500);
              }
            });

            // Animate all progress bars inside the card
            const barFills = card.querySelectorAll(".science-bar-fill");
            barFills.forEach((barFill) => {
              const targetWidth = barFill.style.getPropertyValue("--target-width");
              setTimeout(() => {
                barFill.style.width = targetWidth;
              }, 300);
            });
          }
        });
      },
      { threshold: 0.2 },
    );

    scienceCards.forEach((card) => counterObserver.observe(card));
  }

  function animateCounter(el, target, duration) {
    const start = performance.now();
    const isDecimal = target % 1 !== 0;

    const step = (timestamp) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      if (isDecimal) {
        el.textContent = current.toFixed(1);
      } else {
        el.textContent = Math.floor(current);
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        if (isDecimal) {
          el.textContent = target.toFixed(1);
        } else {
          el.textContent = target;
        }
      }
    };

    requestAnimationFrame(step);
  }

  // ==========================================
  // 7. Canvas-based Ingredient Reactor
  // ==========================================
  const canvas = document.getElementById("reactorCanvas");

  if (canvas) {
    const ctx = canvas.getContext("2d");
    const canvasInstructions = document.getElementById("canvasInstructions");
    const reactorResult = document.getElementById("reactorResult");
    const resultTitle = document.getElementById("resultTitle");
    const resultDesc = document.getElementById("resultDesc");
    const resultIcon = document.getElementById("resultIcon");

    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let particles = [];
    let reactorActiveProduct = null;
    let systemColor = "#B8CCBF";
    let animationFrameId = null;

    class MolecularParticle {
      constructor(x, y, label, color) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || Math.random() * canvas.height;
        this.targetX = this.x;
        this.targetY = this.y;
        this.radius = Math.random() * 5 + 3;
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = (Math.random() - 0.5) * 1.2;
        this.label = label || "";
        this.color = color || "rgba(184, 204, 191, 0.4)";
        this.alpha = 0.7;
      }

      update(isReactorLocked) {
        if (isReactorLocked) {
          this.x += (this.targetX - this.x) * 0.06;
          this.y += (this.targetY - this.y) * 0.06;
          this.alpha = 1;
        } else {
          this.x += this.vx;
          this.y += this.vy;
          if (this.x < 15 || this.x > canvas.width - 15) this.vx *= -1;
          if (this.y < 15 || this.y > canvas.height - 15) this.vy *= -1;
          this.alpha = 0.5;
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius + 6, 0, Math.PI * 2);
        ctx.fillStyle = this.color + "20";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        if (this.label) {
          const match = this.label.match(/^(.*?)(\d+(\.\d+)?%)/);
          if (match) {
            const textPart = match[1]; // e.g., "Niacinamide "
            const percentPart = match[2]; // e.g., "4%"
            
            ctx.font = "600 11px Satoshi, Inter, sans-serif";
            const w1 = ctx.measureText(textPart).width;
            ctx.font = "bold 11px Satoshi, Inter, sans-serif";
            const w2 = ctx.measureText(percentPart).width;
            
            const totalW = w1 + w2;
            const startX = this.x - totalW / 2;
            
            ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
            ctx.font = "600 11px Satoshi, Inter, sans-serif";
            ctx.textAlign = "left";
            ctx.fillText(textPart, startX, this.y - this.radius - 10);
            
            ctx.fillStyle = this.color;
            ctx.font = "bold 11px Satoshi, Inter, sans-serif";
            ctx.fillText(percentPart, startX + w1, this.y - this.radius - 10);
          } else {
            ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
            ctx.font = "600 11px Satoshi, Inter, sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(this.label, this.x, this.y - this.radius - 10);
          }
        }

        ctx.restore();
      }
    }

    const spawnIdleParticles = () => {
      particles = [];
      const baseActives = [
        "Niacinamide 4%",
        "Tranexamic Acid 3%",
        "Alpha Arbutin 2%",
      ];

      for (let i = 0; i < 16; i++) {
        particles.push(
          new MolecularParticle(
            null,
            null,
            baseActives[i % baseActives.length],
            "#B8CCBF",
          ),
        );
      }
    };

    spawnIdleParticles();

    const animateReactor = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isLocked = !!reactorActiveProduct;

      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = isLocked ? 110 : 80;
          if (dist < maxDist) {
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
          }
        }
      }
      ctx.strokeStyle = isLocked
        ? systemColor + "30"
        : "rgba(184, 204, 191, 0.06)";
      ctx.lineWidth = isLocked ? 1.5 : 0.8;
      ctx.stroke();

      particles.forEach((p) => {
        p.update(isLocked);
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animateReactor);
    };

    animateReactor();

    const concernButtons = document.querySelectorAll(".concern-btn");
    const concernProducts = {
      fw: {
        color: "#7cc09a",
        title: "MS Clear Facewash Formulated",
        desc: "Deeply cleanses excessive oil, pollution buildup, and city tan while protecting the skin's daily moisture barrier.",
        actives: [
          "Salicylic Acid 2%",
          "Glycolic Acid 1%",
          "Chamomile Extract",
          "Green Tea Extract",
          "Niacinamide 1%",
          "Panthenol 2%",
          "Allantoin 0.5%",
          "Glycerin 5%",
        ],
      },
      sr: {
        color: "#89b5c0",
        title: "MS Treat Serum Activated",
        desc: "High-performance treatment targets acne scars, hyperpigmentation, and controls excess sebum oil balance.",
        actives: [
          "Niacinamide 4%",
          "Zinc PCA 1%",
          "Tranexamic Acid 3%",
          "Alpha Arbutin 2%",
          "Ceramide NP 0.2%",
          "Centella Asiatica",
          "Squalane 2%",
          "Hyaluronic Acid 1%",
        ],
      },
      ss: {
        color: "#ccab82",
        title: "MS Protect Sunscreen Synthesized",
        desc: "Broad-spectrum SPF 50+ PA++++ matte protection designed to shield against intense UV exposure and sweat.",
        actives: [
          "SPF 50+ Protection",
          "PA++++ UVA Defense",
          "Niacinamide 2%",
          "Ceramide AP 0.1%",
          "Aloe Vera Hydrolat",
          "Vitamin E 1%",
          "Hyaluronic Acid 1%",
          "Adenosine 0.1%",
        ],
      },
    };

    concernButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        concernButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const productType = btn.dataset.acid;
        reactorActiveProduct = productType;
        const productInfo = concernProducts[productType];
        systemColor = productInfo.color;

        if (canvasInstructions) canvasInstructions.classList.add("hidden");
        if (resultTitle) resultTitle.textContent = productInfo.title;
        if (resultDesc) resultDesc.textContent = productInfo.desc;
        if (reactorResult) reactorResult.classList.add("visible");

        particles = [];
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const totalPoints = productInfo.actives.length;

        for (let i = 0; i < totalPoints; i++) {
          const angle = (i / totalPoints) * Math.PI * 2;
          const radius = i % 2 === 0 ? 80 : 120;
          const targetX = centerX + Math.cos(angle) * radius;
          const targetY = centerY + Math.sin(angle) * radius;

          const spawnAngle = Math.random() * Math.PI * 2;
          const startX = centerX + Math.cos(spawnAngle) * 250;
          const startY = centerY + Math.sin(spawnAngle) * 250;

          particles.push(
            new MolecularParticle(
              startX,
              startY,
              productInfo.actives[i],
              systemColor,
            ),
          );

          particles[i].targetX = targetX;
          particles[i].targetY = targetY;
        }
      });
    });
  } // end reactor

  // ==========================================
  // 8. Shopify AJAX Cart Integration
  // ==========================================
  const cartTrigger = document.getElementById("cartTrigger");
  const cartTriggers = document.querySelectorAll(".cart-trigger");
  const cartBadgeCount = document.getElementById("cartBadgeCount");
  
  const cartDrawer = document.getElementById("cartDrawer");
  const cartOverlay = document.getElementById("cartOverlay");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const drawerCartItemsContainer = document.getElementById("drawerCartItemsContainer");
  const drawerCartFooter = document.getElementById("drawerCartFooter");
  const drawerCartSubtotalValue = document.getElementById("drawerCartSubtotalValue");
  const drawerCartTotalValue = document.getElementById("drawerCartTotalValue");
  
  const drawerShippingMessage = document.getElementById("drawerShippingMessage");
  const drawerShippingPercent = document.getElementById("drawerShippingPercent");
  const drawerShippingFill = document.getElementById("drawerShippingFill");
  
  const drawerContinueBtn = document.getElementById("drawerContinueBtn");

  // Custom toast triggers
  let toastTimeout = null;
  const triggerToast = (message) => {
    const toastEl = document.getElementById("cartToast");
    const msgEl = document.getElementById("toastMessage");
    if (!toastEl || !msgEl) return;
    msgEl.innerHTML = message;
    toastEl.classList.add("visible");
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastEl.classList.remove("visible");
    }, 4500);
  };

  const triggerCartFeedback = () => {
    // Haptic feedback sequence (short double pulse)
    if (navigator.vibrate) {
      navigator.vibrate([40, 30, 40]);
    }

    // Glow effect on all cart trigger elements
    const triggers = document.querySelectorAll(".cart-trigger");
    triggers.forEach((el) => {
      el.classList.remove("glow-active");
      void el.offsetWidth; // Force reflow
      el.classList.add("glow-active");
    });

    // Count badge bump
    const badges = document.querySelectorAll(".cart-count");
    badges.forEach((el) => {
      el.classList.remove("bump-active");
      void el.offsetWidth; // Force reflow
      el.classList.add("bump-active");
    });

    if (window.cartFeedbackTimeout) {
      clearTimeout(window.cartFeedbackTimeout);
    }
    window.cartFeedbackTimeout = setTimeout(() => {
      triggers.forEach((el) => {
        el.classList.remove("glow-active");
      });
      badges.forEach((el) => {
        el.classList.remove("bump-active");
      });
    }, 3000);
  };

  // Helper: Format Money in INR format
  const formatMoney = (cents) => {
    const amt = parseFloat(cents / 100).toFixed(2);
    // Format to Indian grouping: e.g. 1,00,000.00
    const parts = amt.split('.');
    let num = parts[0];
    const dec = parts[1];
    let lastThree = num.substring(num.length - 3);
    const otherNumbers = num.substring(0, num.length - 3);
    if (otherNumbers !== '') {
      lastThree = ',' + lastThree;
    }
    const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return '₹' + res;
  };

  // Drawer Toggles
  const openCartDrawer = () => {
    if (cartDrawer) cartDrawer.classList.add("open");
    if (cartOverlay) cartOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  const closeCartDrawer = () => {
    if (cartDrawer) cartDrawer.classList.remove("open");
    if (cartOverlay) cartOverlay.classList.remove("open");
    document.body.style.overflow = "";
  };

  if (closeCartBtn) closeCartBtn.addEventListener("click", closeCartDrawer);
  if (cartOverlay) cartOverlay.addEventListener("click", closeCartDrawer);
  if (drawerContinueBtn) drawerContinueBtn.addEventListener("click", closeCartDrawer);

  const renderCartDrawer = (cartData) => {
    if (!drawerCartItemsContainer) return;

    if (!cartData || cartData.item_count === 0) {
      drawerCartItemsContainer.innerHTML = `<div class="cart-empty-message">Your routine is empty.<br>Add a product to begin your journey.</div>`;
      if (drawerCartFooter) drawerCartFooter.style.display = "none";
      
      // Update shipping bar to 0%
      if (drawerShippingMessage) {
        drawerShippingMessage.innerHTML = 'Add <span class="highlight">₹499.00</span> more for <span class="highlight">free shipping</span>';
      }
      if (drawerShippingPercent) drawerShippingPercent.textContent = "0%";
      if (drawerShippingFill) drawerShippingFill.style.width = "0%";
      return;
    }

    // Render items
    drawerCartItemsContainer.innerHTML = "";
    cartData.items.forEach((item) => {
      const itemEl = document.createElement("div");
      itemEl.className = "cart-item";
      itemEl.innerHTML = `
        <button type="button" class="remove-cart-item-btn" data-variant-id="${item.variant_id}" aria-label="Remove item">&times;</button>
        <div class="cart-item-img">
          <img src="${item.image}" alt="${escapeHTML(item.product_title)}" style="width: 100%; height: 100%; object-fit: contain;">
        </div>
        <div class="cart-item-details">
          <h4>${escapeHTML(item.product_title)}</h4>
          <p>${formatMoney(item.price)} each</p>
          <div class="cart-item-quantity">
            <button type="button" class="qty-btn dec-btn" data-variant-id="${item.variant_id}" data-qty="${item.quantity - 1}">−</button>
            <span class="item-qty">${item.quantity}</span>
            <button type="button" class="qty-btn inc-btn" data-variant-id="${item.variant_id}" data-qty="${item.quantity + 1}">+</button>
          </div>
        </div>
        <div class="cart-item-price">${formatMoney(item.line_price)}</div>
      `;
      drawerCartItemsContainer.appendChild(itemEl);
    });

    // Subtotal and Total
    if (drawerCartSubtotalValue) drawerCartSubtotalValue.textContent = formatMoney(cartData.original_total_price);
    if (drawerCartTotalValue) drawerCartTotalValue.textContent = formatMoney(cartData.total_price);
    if (drawerCartFooter) drawerCartFooter.style.display = "block";

    // Shipping calculations
    const freeShippingThreshold = 49900; // ₹499
    const total = cartData.total_price;
    if (total >= freeShippingThreshold) {
      if (drawerShippingMessage) drawerShippingMessage.innerHTML = '🎉 You\'ve unlocked <span class="highlight">free shipping!</span>';
      if (drawerShippingPercent) drawerShippingPercent.textContent = "100%";
      if (drawerShippingFill) drawerShippingFill.style.width = "100%";
    } else {
      const remaining = freeShippingThreshold - total;
      const pct = Math.round((total / freeShippingThreshold) * 100);
      if (drawerShippingMessage) {
        drawerShippingMessage.innerHTML = `Add <span class="highlight">${formatMoney(remaining)}</span> more for <span class="highlight">free shipping</span>`;
      }
      if (drawerShippingPercent) drawerShippingPercent.textContent = `${pct}%`;
      if (drawerShippingFill) drawerShippingFill.style.width = `${pct}%`;
    }

    // Attach quantity and remove listeners inside drawer
    drawerCartItemsContainer.querySelectorAll(".qty-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const variantId = btn.dataset.variantId;
        const newQty = btn.dataset.qty;
        changeCartQty(variantId, newQty);
      });
    });

    drawerCartItemsContainer.querySelectorAll(".remove-cart-item-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const variantId = btn.dataset.variantId;
        changeCartQty(variantId, 0);
      });
    });
  };

  const changeCartQty = (variantId, qty) => {
    fetch('/cart/change.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: variantId,
        quantity: parseInt(qty)
      })
    })
    .then(res => res.json())
    .then(cartData => {
      // Sync badges
      if (cartBadgeCount) cartBadgeCount.textContent = cartData.item_count;
      document.querySelectorAll(".cart-count").forEach(badge => {
        badge.textContent = cartData.item_count;
      });
      // Re-render
      renderCartDrawer(cartData);
    })
    .catch(err => {
      console.error('Error modifying cart quantities:', err);
    });
  };

  const updateCartCount = () => {
    fetch('/cart.js')
      .then((res) => res.json())
      .then((cartData) => {
        if (cartBadgeCount) cartBadgeCount.textContent = cartData.item_count;
        
        // Also update badges globally
        document.querySelectorAll(".cart-count").forEach(badge => {
          badge.textContent = cartData.item_count;
        });

        // Sync drawer rendering
        renderCartDrawer(cartData);
      })
      .catch((err) => console.error("Error fetching Shopify cart:", err));
  };

  // Open cart drawer instead of redirecting
  const toggleCart = (e) => {
    if (e) e.preventDefault();
    openCartDrawer();
    updateCartCount();
  };

  if (cartTrigger) cartTrigger.addEventListener("click", toggleCart);
  cartTriggers.forEach((btn) => btn.addEventListener("click", toggleCart));

  // Bind add-to-cart buttons (handles homepage catalog + page collection templates)
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    if (!btn.hasAttribute("data-cart-listener")) {
      btn.setAttribute("data-cart-listener", "true");
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        
        const variantId = btn.dataset.variantId;
        const productName = btn.dataset.name || "Product";
        
        if (!variantId || variantId.trim() === "") {
          triggerToast(`⚠️ <strong>Variant missing!</strong><br><span style="font-size:0.82rem; color:rgba(255,255,255,0.7)">Please create product <em>"${productName}"</em> with handles 'facewash', 'serum', or 'sunscreen' in Shopify panel first.</span>`);
          return;
        }

        if (btn.classList.contains("adding") || btn.classList.contains("added"))
          return;

        if (navigator.vibrate) navigator.vibrate(50);

        const originalText = btn.innerHTML;
        const originalWidth = btn.offsetWidth;

        btn.style.width = originalWidth + "px";
        btn.classList.add("adding");

        // Shopify AJAX Cart Add
        fetch("/cart/add.js", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            items: [{ id: variantId, quantity: 1 }]
          })
        })
        .then(res => res.json())
        .then(itemData => {
          if (itemData.description) {
            // Shopify error (e.g. Out of stock)
            triggerToast(`⚠️ <strong>Unavailable!</strong> ${itemData.description}`);
            btn.classList.remove("adding");
            btn.innerHTML = originalText;
            btn.style.width = "";
          } else {
            // Success Add
            btn.classList.remove("adding");
            btn.classList.add("added");

            btn.innerHTML = `
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            `;

            triggerToast(`✨ <strong>${productName}</strong> added to routine!`);
            triggerCartFeedback();
            
            // Re-fetch cart data and open sidebar drawer
            updateCartCount();
            openCartDrawer();

            setTimeout(() => {
              btn.classList.remove("added");
              btn.innerHTML = originalText;
              btn.style.width = "";
            }, 2000);
          }
        })
        .catch(err => {
          console.error("Error adding to Shopify cart:", err);
          btn.classList.remove("adding");
          btn.innerHTML = originalText;
          btn.style.width = "";
        });
      });
    }
  });

  // ==========================================
  // 9. Filter/Sort Dropdowns — Series Section
  // ==========================================
  window.toggleDropdown = function (id) {
    const menu = document.getElementById(id);
    const btn = menu ? menu.previousElementSibling : null;
    if (!menu) return;

    document.querySelectorAll(".dropdown-menu.open").forEach((m) => {
      if (m.id !== id) {
        m.classList.remove("open");
        if (m.previousElementSibling)
          m.previousElementSibling.classList.remove("open");
      }
    });

    const isOpen = menu.classList.toggle("open");
    if (btn) btn.classList.toggle("open", isOpen);
  };

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".filter-dropdown")) {
      document.querySelectorAll(".dropdown-menu.open").forEach((m) => {
        m.classList.remove("open");
        if (m.previousElementSibling)
          m.previousElementSibling.classList.remove("open");
      });
    }
  });

  const sortOptions = document.querySelectorAll(".sort-option");
  const sortLabel = document.getElementById("sortLabel");
  const seriesGrid = document.getElementById("seriesGrid");

  sortOptions.forEach((opt) => {
    opt.addEventListener("click", () => {
      sortOptions.forEach((o) => o.classList.remove("active"));
      opt.classList.add("active");
      if (sortLabel) sortLabel.textContent = opt.textContent;
      const sortDropdown = document.getElementById("sortDropdown");
      if (sortDropdown) sortDropdown.classList.remove("open");
      const sortBtn = document.querySelector("#sortBy .filter-btn");
      if (sortBtn) sortBtn.classList.remove("open");
      sortSeriesCards(opt.dataset.sort);
    });
  });

  function sortSeriesCards(method) {
    if (!seriesGrid) return;
    const cards = Array.from(seriesGrid.querySelectorAll(".series-card"));
    cards.sort((a, b) => {
      const nameA = a.dataset.name.toLowerCase();
      const nameB = b.dataset.name.toLowerCase();
      const priceA = parseInt(a.dataset.price);
      const priceB = parseInt(b.dataset.price);
      if (method === "alpha-asc") return nameA.localeCompare(nameB);
      if (method === "alpha-desc") return nameB.localeCompare(nameA);
      if (method === "price-asc") return priceA - priceB;
      if (method === "price-desc") return priceB - priceA;
      return 0;
    });
    cards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
    });
    setTimeout(() => {
      cards.forEach((card) => seriesGrid.appendChild(card));
      requestAnimationFrame(() => {
        cards.forEach((card, i) => {
          setTimeout(() => {
            card.style.transition = "opacity 0.4s ease, transform 0.4s ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, i * 60);
        });
      });
    }, 150);
  }

  // Price filter
  document.querySelectorAll('input[name="price"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      const val = radio.value;
      const cards = document.querySelectorAll(".series-card");
      let count = 0;
      cards.forEach((card) => {
        const price = parseInt(card.dataset.price);
        let show = true;
        if (val === "under400" && price >= 400) show = false;
        if (val === "over400" && price < 400) show = false;
        card.style.display = show ? "" : "none";
        if (show) count++;
      });
      const countEl = document.getElementById("seriesProductCount");
      if (countEl)
        countEl.textContent = `${count} product${count !== 1 ? "s" : ""}`;
    });
  });

  // ==========================================
  // 11. Mobile Navigation Menu Toggle
  // ==========================================
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navMenu = document.getElementById("navMenu");

  const toggleMobileNav = () => {
    if (navMenu) navMenu.classList.toggle("open");
    if (mobileMenuBtn) mobileMenuBtn.classList.toggle("open");
  };

  if (mobileMenuBtn) mobileMenuBtn.addEventListener("click", toggleMobileNav);

  // ==========================================
  // 12. Search Overlay & Live Search Logic
  // ==========================================
  const searchTrigger = document.getElementById("searchTrigger");
  const searchOverlay = document.getElementById("searchOverlay");
  const closeSearchBtn = document.getElementById("closeSearchBtn");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  const searchIndex = [
    {
      id: "fw",
      name: "Multi Active MS Clear",
      category: "Cleanse",
      price: "₹349",
      desc: "Deep-cleansing BHA formula that removes oil, tan, and pollution buildup.",
      image: "fw",
      url: "/pages/series",
      keywords: ["face wash", "cleanser", "bha", "salicylic acid", "2%", "glycolic", "tan", "oil", "acne", "chamomile", "cleanse", "ms clear", "clear"]
    },
    {
      id: "sr",
      name: "Multi Active MS Treat",
      category: "Treat",
      price: "₹599",
      desc: "Potent actives that target acne scars, regulate sebum and rapidly restore your skin's moisture barrier.",
      image: "sr",
      url: "/pages/series",
      keywords: ["serum", "barrier boost", "niacinamide", "4%", "zinc", "tranexamic acid", "3%", "alpha arbutin", "2%", "acne scars", "hyperpigmentation", "pores", "hydration", "treat", "ms treat", "treat"]
    },
    {
      id: "ss",
      name: "Multi Active MS Protect",
      category: "Protect",
      price: "₹549",
      desc: "Broad-spectrum UVA/UVB matte sunscreen engineered for Indian heat and humidity.",
      image: "ss",
      url: "/pages/series",
      keywords: ["sunscreen", "sun shield", "spf", "spf 50", "uva", "uvb", "matte", "sun protect", "sun block", "protect", "ms protect", "protect"]
    },
    {
      id: "ta",
      name: "Tranexamic Acid 3%",
      category: "Clinical Active",
      price: "",
      desc: "High-purity clinical active that targets dark spots, melasma, and hyperpigmentation. Found in MS Treat Serum.",
      image: "sr",
      url: "/#reactor",
      keywords: ["tranexamic", "ta", "dark spots", "melasma", "hyperpigmentation", "pigmentation", "3%"]
    },
    {
      id: "aa",
      name: "Alpha Arbutin 2%",
      category: "Clinical Active",
      price: "",
      desc: "Potent skin brightener that reduces melanin production and evens out discoloration. Found in MS Treat Serum.",
      image: "sr",
      url: "/#reactor",
      keywords: ["alpha arbutin", "arbutin", "brightening", "discoloration", "melanin", "2%"]
    },
    {
      id: "na",
      name: "Niacinamide 4%",
      category: "Clinical Active",
      price: "",
      desc: "Vitamin B3 active that regulates sebum, shrinks pores, and repairs lipid barrier. Found in MS Clear Facewash, MS Treat Serum, & MS Protect Sunscreen.",
      image: "sr",
      url: "/#reactor",
      keywords: ["niacinamide", "vitamin b3", "sebum", "pores", "barrier repair", "4%"]
    }
  ];

  const toggleSearch = (open) => {
    if (!searchOverlay) return;
    if (open) {
      searchOverlay.classList.add("open");
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        if (searchInput) searchInput.focus();
      }, 100);
      renderSearchResults("");
    } else {
      searchOverlay.classList.remove("open");
      document.body.style.overflow = "";
      if (searchInput) searchInput.value = "";
    }
  };

  if (searchTrigger) {
    searchTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      toggleSearch(true);
    });
  }

  if (closeSearchBtn) {
    closeSearchBtn.addEventListener("click", () => toggleSearch(false));
  }

  if (searchOverlay) {
    searchOverlay.addEventListener("click", (e) => {
      if (e.target === searchOverlay) {
        toggleSearch(false);
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && searchOverlay && searchOverlay.classList.contains("open")) {
      toggleSearch(false);
    }
  });

  const getProductImageSrc = (imgKey) => {
    if (window.ManSeriesAssets && window.ManSeriesAssets[imgKey]) {
      return window.ManSeriesAssets[imgKey];
    }
    // Fallbacks
    if (imgKey === "fw") return "Transparent_Facewash.png";
    if (imgKey === "sr") return "Transparent_Serum.png";
    if (imgKey === "ss") return "Transparent_Sunscreen.png";
    return "";
  };

  const renderSearchResults = (query) => {
    if (!searchResults) return;
    const cleanQuery = query.toLowerCase().trim();

    if (!cleanQuery) {
      searchResults.innerHTML = `
        <h4 class="popular-searches-title">Popular Searches</h4>
        <div class="popular-search-tags">
          <button class="popular-search-tag" data-query="Niacinamide">Niacinamide</button>
          <button class="popular-search-tag" data-query="Face Wash">Face Wash</button>
          <button class="popular-search-tag" data-query="Sunscreen">Sunscreen</button>
          <button class="popular-search-tag" data-query="B.Y.O.S.">B.Y.O.S.</button>
          <button class="popular-search-tag" data-query="Tranexamic">Tranexamic</button>
        </div>
      `;

      searchResults.querySelectorAll(".popular-search-tag").forEach(tag => {
        tag.addEventListener("click", () => {
          const val = tag.dataset.query;
          if (searchInput) {
            searchInput.value = val;
            renderSearchResults(val);
          }
        });
      });
      return;
    }

    const matches = searchIndex.filter(item => {
      return item.name.toLowerCase().includes(cleanQuery) ||
             item.desc.toLowerCase().includes(cleanQuery) ||
             item.category.toLowerCase().includes(cleanQuery) ||
             item.keywords.some(k => k.includes(cleanQuery));
    });

    if (matches.length === 0) {
      searchResults.innerHTML = `
        <div class="no-results-msg">
          No matches found for "<strong>${escapeHTML(query)}</strong>"<br>
          <span style="font-size:0.85rem; color:var(--muted);">Try checking spelling or use more general keywords.</span>
        </div>
      `;
      return;
    }

    searchResults.innerHTML = "";
    matches.forEach((item, index) => {
      const itemNode = document.createElement("a");
      itemNode.href = item.url;
      itemNode.className = "search-result-item";
      itemNode.style.animation = `fadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${index * 50}ms forwards`;

      const imgSrc = getProductImageSrc(item.image);

      itemNode.innerHTML = `
        <div class="search-result-img">
          <img src="${imgSrc}" alt="${item.name}">
        </div>
        <div class="search-result-info">
          <div class="search-result-category">${item.category}</div>
          <div class="search-result-title">${item.name}</div>
          <div class="search-result-desc">${item.desc}</div>
        </div>
        ${item.price ? `<div class="search-result-price">${item.price}</div>` : ""}
      `;

      itemNode.addEventListener("click", (e) => {
        if (item.url.includes("#") && (window.location.pathname === "/" || window.location.pathname === "/index.html")) {
          const hash = item.url.split("#")[1];
          const el = document.getElementById(hash);
          if (el) {
            e.preventDefault();
            toggleSearch(false);
            el.scrollIntoView({ behavior: "smooth" });
            if (hash === "reactor") {
              let targetId = item.id;
              if (targetId === "ta" || targetId === "aa" || targetId === "na") {
                targetId = "sr";
              }
              const btn = document.querySelector(`.concern-btn[data-acid="${targetId}"]`);
              if (btn) btn.click();
            }
          }
        }
      });

      searchResults.appendChild(itemNode);
    });
  };

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      renderSearchResults(e.target.value);
    });
  }

  // Expose cart functions globally
  window.triggerToast = triggerToast;
  window.triggerCartFeedback = triggerCartFeedback;
  window.openCartDrawer = openCartDrawer;
  window.closeCartDrawer = closeCartDrawer;
  window.updateCartCount = updateCartCount;

  // Initialize cart badge count on page load
  updateCartCount();
});
