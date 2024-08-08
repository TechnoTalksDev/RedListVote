<style>
.container {
  display: flex;
  flex-direction: column; /* Arrange children in a row */
  justify-content: center; /* Center items horizontally */
  align-items: center; /* Center items vertically */
  height: 100vh; /* Full viewport height */
  padding: 20px; /* Optional: Add some padding */
  gap: 20px; /* Space between header and image */
}


.bg-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 0px;
      height: 100vh;
      width: 100vw
}
.bg-grid img {
      width: 100%;
      height: 100%;
      object-fit: cover;
}
</style>

<!--
<div class="container">
  <div class="header">
    <div class="header-line">
      <span class="red">Species</span>
      <span class="white">Education</span>
    </div>
    <span class="white">+ Protection</span>
  </div>
  <div class = "image-wrapper">
    <img src="https://images.theconversation.com/files/3983/original/100_3311_Regent_Honeyeater.jpg?ixlib=rb-1.1.0&q=15&auto=format&w=600&h=900&fit=crop&dpr=3" class="image-class1">
  </div>
  <div class = "image-wrapper1">
    <img src="https://www.treehugger.com/thmb/EVZfCt85hCzNiQut3-5hs9hUgJI=/2121x1414/filters:fill(auto,1)/GettyImages-86070465-77c2cced68984108b624ad2efa1f2941.jpg" alt="interesting image" class="image-class">
    <img src="https://www.readersdigest.ca/wp-content/uploads/2020/05/GettyImages-167003501-e1588615050120.jpg" alt="interesting image" class="image-class2">  
  </div>
</div>
-->

<!--
<div class="container flex flex-row w-full h-full justify-center items-center">
  <div class="text-center">
    <span class="text-7xl">Species </span>
    <span class="text-7xl text-green-500 ml-3 animate-pulse">Education + Protection</span>
  </div>
  <div class="flex flex-row justify-center items-center space-x-5">
    <div class = "image-wrapper">
      <img src="https://images.theconversation.com/files/3983/original/100_3311_Regent_Honeyeater.jpg?ixlib=rb-1.1.0&q=15&auto=format&w=600&h=900&fit=crop&dpr=3" class="image-class1">
    </div>
    <div class = "w-[150%] flex flex-col space-y-3">
      <img src="https://www.treehugger.com/thmb/EVZfCt85hCzNiQut3-5hs9hUgJI=/2121x1414/filters:fill(auto,1)/GettyImages-86070465-77c2cced68984108b624ad2efa1f2941.jpg" alt="interesting image" class="image-class transition ease-in-out delay-150 hover:translate-y-1 hover:scale-110 duration-300">
      <img src="https://www.readersdigest.ca/wp-content/uploads/2020/05/GettyImages-167003501-e1588615050120.jpg" alt="interesting image" class="image-class2 transition ease-in-out delay-150 hover:translate-y-1 hover:scale-110 duration-300">  
    </div>
  </div>
</div>
-->
<div class="flex justify-center items-center h-full overflow-auto">
  <div class="absolute inset-0 bg-grid opacity-30">
    <img src="https://www.treehugger.com/thmb/EVZfCt85hCzNiQut3-5hs9hUgJI=/2121x1414/filters:fill(auto,1)/GettyImages-86070465-77c2cced68984108b624ad2efa1f2941.jpg" alt="Animal 1">
    <img src="https://images.theconversation.com/files/3983/original/100_3311_Regent_Honeyeater.jpg?ixlib=rb-1.1.0&q=15&auto=format&w=600&h=900&fit=crop&dpr=3" alt="Animal 2">
    <img src="https://media.nationalgeographic.org/assets/photos/000/222/22252.jpg" alt="Animal 3">
    <img src="https://www.readersdigest.ca/wp-content/uploads/2020/05/GettyImages-167003501-e1588615050120.jpg" alt="Animal 3">
    <img src="https://www.worldatlas.com/r/w1200/upload/7d/9f/15/shutterstock-655717825.jpg" alt="Animal 3">
    <img src="https://th.bing.com/th/id/OIP.3IFsvpWKqbJkFn3yj0pqgwHaFV?w=768&h=553&rs=1&pid=ImgDetMain" alt="Animal 3">
    <img src="https://www.readersdigest.ca/wp-content/uploads/2020/05/GettyImages-989287252-e1588613544472.jpg" alt="Animal 3">
    <!-- Add more images as needed -->
  </div>
  <div class="container relative z-10 text-center">
    <h1 class="text-7xl"><span class="text-primary-500">Awareness</span> and <span class="text-primary-500">impact</span> for <br/> endangered species</h1>
    <a href="/vote"><button class="btn variant-glass-primary">Vote</button></a>
    <a href="https://protect.worldwildlife.org/page/68470/donate/1?en_og_source=Web_Donation&ea.tracking.id=Web_Topnav&supporter.appealCode=AWE2402OQ18299A01179RX" target="_blank">
      <button class="btn variant-glass-primary">Donate</button>
    </a>
  </div>
</div>


