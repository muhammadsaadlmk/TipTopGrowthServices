// TikTok Growth Services - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Fix for legal dropdown menu on mobile
    const legalDropdown = document.querySelector('.dropdown-toggle[aria-expanded="false"]');
    if (legalDropdown) {
        legalDropdown.addEventListener('click', function(e) {
            // Prevent default only on mobile devices
            if (window.innerWidth < 992) {
                e.preventDefault();
            }
        });
    }
    
    // Form validation for TikTok profile link
    const profileLinkInput = document.getElementById('profile_link');
    if (profileLinkInput) {
        profileLinkInput.addEventListener('blur', function() {
            validateTikTokLink(this);
        });
    }
    
    // Real-time validation for TikTok profile link
    function validateTikTokLink(input) {
        const value = input.value.trim();
        const isValid = value.startsWith('https://www.tiktok.com/') || 
                        value.startsWith('https://tiktok.com/');
        
        if (value && !isValid) {
            input.classList.add('is-invalid');
            
            // Create feedback element if it doesn't exist
            let feedback = input.nextElementSibling;
            if (!feedback || !feedback.classList.contains('invalid-feedback')) {
                feedback = document.createElement('div');
                feedback.classList.add('invalid-feedback');
                input.parentNode.insertBefore(feedback, input.nextSibling);
            }
            
            feedback.textContent = 'Please enter a valid TikTok profile link (https://www.tiktok.com/@username)';
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
            
            // Remove any existing feedback
            const feedback = input.nextElementSibling;
            if (feedback && feedback.classList.contains('invalid-feedback')) {
                feedback.remove();
            }
        }
        
        return isValid;
    }
    
    // Form submission validation
    const form = document.getElementById('tiktok-service-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            const profileLink = document.getElementById('profile_link');
            const followers = document.getElementById('followers');
            const likes = document.getElementById('likes');
            const comments = document.getElementById('comments');
            const views = document.getElementById('views');
            
            // Validate TikTok link
            if (!validateTikTokLink(profileLink)) {
                e.preventDefault();
                return false;
            }
            
            // Check if at least one service is selected
            const totalServices = 
                parseInt(followers.value || 0) + 
                parseInt(likes.value || 0) + 
                parseInt(comments.value || 0) + 
                parseInt(views.value || 0);
                
            if (totalServices <= 0) {
                e.preventDefault();
                
                // Create alert message
                const alertDiv = document.createElement('div');
                alertDiv.classList.add('alert', 'alert-danger', 'mt-3');
                alertDiv.textContent = 'Please select at least one service (followers, likes, comments, or views).';
                
                // Insert before the form
                form.parentNode.insertBefore(alertDiv, form);
                
                // Remove alert after 5 seconds
                setTimeout(() => {
                    alertDiv.remove();
                }, 5000);
                
                return false;
            }
            
            // Validate custom comment if selected
            const commentType = document.getElementById('comment_type');
            const customComment = document.getElementById('custom_comment');
            
            if (parseInt(comments.value) > 0 && 
                commentType.value === 'custom' && 
                (!customComment.value || customComment.value.trim() === '')) {
                
                e.preventDefault();
                customComment.classList.add('is-invalid');
                
                // Create feedback if it doesn't exist
                let feedback = customComment.nextElementSibling;
                if (!feedback || !feedback.classList.contains('invalid-feedback')) {
                    feedback = document.createElement('div');
                    feedback.classList.add('invalid-feedback');
                    customComment.parentNode.insertBefore(feedback, customComment.nextSibling);
                }
                
                feedback.textContent = 'Please enter your custom comment text';
                return false;
            }
        });
    }
    
    // Calculate price
    function updatePriceWithDiscount() {
        console.log("Running updatePriceWithDiscount function...");
        
        const followers = parseInt(document.getElementById('followers')?.value || 0);
        const likes = parseInt(document.getElementById('likes')?.value || 0);
        const comments = parseInt(document.getElementById('comments')?.value || 0);
        const commentType = document.getElementById('comment_type')?.value || 'random';
        const views = parseInt(document.getElementById('views')?.value || 0);
        const watchTime = document.getElementById('watch_time')?.value || 'random';
        
        console.log("Form values:", {followers, likes, comments, commentType, views, watchTime});
            
        // Calculate base price
        let price = 0;
        
        if (followers > 0) {
            const followerPrice = followers * 1;
            price += followerPrice; // 1 PKR per follower
            console.log(`Adding ${followers} followers: +${followerPrice} PKR`);
        }
        
        if (likes > 0) {
            const likePrice = likes * 0.2;
            price += likePrice; // 0.2 PKR per like
            console.log(`Adding ${likes} likes: +${likePrice} PKR`);
        }
        
        if (comments > 0) {
            let commentPrice = 0;
            if (commentType === 'random') {
                commentPrice = comments * 0.4;
                price += commentPrice; // 0.4 PKR per random comment
                console.log(`Adding ${comments} random comments: +${commentPrice} PKR`);
            } else {
                commentPrice = comments * 1;
                price += commentPrice; // 1 PKR per custom comment
                console.log(`Adding ${comments} custom comments: +${commentPrice} PKR`);
            }
        }
        
        if (views > 0) {
            const viewsPrice = views * 0.5;
            price += viewsPrice; // 0.5 PKR per view
            console.log(`Adding ${views} views: +${viewsPrice} PKR`);
            
            if (watchTime === 'custom') {
                const customTimePrice = views * 1;
                price += customTimePrice; // Additional 1 PKR for custom watch time
                console.log(`Adding custom watch time for ${views} views: +${customTimePrice} PKR`);
            }
        }
        
        // Round to 2 decimal places
        const exactPrice = Math.round(price * 100) / 100;
        console.log("Base price calculated:", exactPrice);
        
        // Round up to nearest integer
        const roundedPrice = Math.ceil(exactPrice);
        
        // Update the price display
        const totalPriceElement = document.getElementById('total-price');
        if (totalPriceElement) {
            totalPriceElement.textContent = `PKR ${exactPrice.toFixed(2)}`;
        }
        
        // Update the rounded price display
        const roundedPriceElement = document.getElementById('rounded-price');
        if (roundedPriceElement) {
            roundedPriceElement.textContent = `PKR ${roundedPrice}`;
        }
        
        // Update hidden fields for form submission
        document.getElementById('original_price').value = exactPrice.toFixed(2);
        document.getElementById('original_rounded_price').value = roundedPrice;
        
        console.log("Price updated:", exactPrice.toFixed(2));
        return exactPrice;
    }
    
    // Add event listeners for price calculation
    const priceElements = ['followers', 'likes', 'comments', 'views', 'comment_type', 'watch_time'];
    priceElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', updatePriceWithDiscount);
            element.addEventListener('change', updatePriceWithDiscount);
        }
    });
    
    // Initialize price calculation on page load
    updatePriceWithDiscount();
});
