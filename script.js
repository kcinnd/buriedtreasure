<script>
    let movementCount = 0;
    const threshold = 1000; // Amount of mouse movement needed to reveal the treasure

    document.querySelector('.container').addEventListener('mousemove', function() {
        movementCount++; // Increment movement count on mouse move
        if (movementCount > threshold) {
            document.getElementById('treasure').style.display = 'block'; // Show the treasure
        }
    });
</script>
