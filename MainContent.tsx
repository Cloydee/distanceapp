import React, { useState } from 'react';
import { Course } from '../types';
import QuizActivity from './QuizActivity';

const english9Questions = [
    { q: "1. What is an earthquake?", o: ["A. A flood caused by heavy rain", "B. A sudden shaking of the ground due to a slip on a fault", "C. A strong wind that moves tectonic plates", "D. A volcanic eruption under the sea"] },
    { q: "2. What does DRRM stand for?", o: ["A. Disaster Risk and Rescue Management", "B. Disaster Readiness and Response Manual", "C. Disaster Risk Reduction and Management", "D. Disaster Response and Relief Mission"] },
    { q: "3. What is the main purpose of DRRM?", o: ["A. To create new types of disasters", "B. To reduce disaster risks through prevention and preparedness", "C. To predict the weather accurately", "D. To provide entertainment during disasters"] },
    { q: "4. Which of the following should be done before an earthquake?", o: ["A. Drop, Cover, and Hold On", "B. Stay under a sturdy table", "C. Create a family emergency plan", "D. Check for gas leaks"] },
    { q: "5. Which of the following items should be included in an emergency kit?", o: ["A. Toys and books", "B. Non-perishable food, water, and first-aid kit", "C. Clothes for fashion", "D. Decorations and souvenirs"] },
    { q: "6. What should you do during an earthquake?", o: ["A. Run outside immediately", "B. Drop, Cover, and Hold On", "C. Use the elevator to evacuate", "D. Take pictures of the shaking"] },
    { q: "7. What should you avoid doing after an earthquake?", o: ["A. Check for injuries", "B. Stay informed via battery-powered radio", "C. Stay out of damaged buildings", "D. Use your phone for long personal calls"] },
    { q: "8. Why is it important to secure heavy furniture before an earthquake?", o: ["A. To make the house look tidy", "B. To prevent them from falling and causing injuries", "C. To save space in the room", "D. To decorate the wall"] },
];

const tleIct9Questions = [
    { q: "1. What is a wireless network?", o: ["A. A network that uses cables to connect devices", "B. A network that uses radio waves or signals to connect devices without wires", "C. A network that connects only through telephone lines", "D. A network that works only with electricity"] },
    { q: "2. Which of the following is a main characteristic of a wireless network?", o: ["A. It limits user movement", "B. It requires complex wiring", "C. It allows users to connect without cables", "D. It cannot connect to the internet"] },
    { q: "3. What type of wireless network connects devices like smartphones and Bluetooth headsets within a short distance?", o: ["A. WLAN", "B. WPAN", "C. WWAN", "D. WMAN"] },
    { q: "4. What type of wireless network is commonly used at home, in schools, and in offices through Wi-Fi?", o: ["A. Wireless Local Area Network (WLAN)", "B. Wireless Metropolitan Area Network (WMAN)", "C. Wireless Wide Area Network (WWAN)", "D. Wireless Personal Area Network (WPAN)"] },
    { q: "5. Which of the following connects wireless devices to a wired network and acts as a central hub?", o: ["A. Access Point", "B. Antenna", "C. Network Switch", "D. Modem"] },
    { q: "6. What is one advantage of using a wireless network?", o: ["A. It is very expensive to install", "B. It limits the number of connected devices", "C. It allows easy access and mobility", "D. It works only with desktop computers"] },
    { q: "7. What is a common disadvantage of wireless networks?", o: ["A. They are faster than wired connections", "B. They are completely secure from hackers", "C. They are prone to interference and signal loss", "D. They can only be used indoors"] },
    { q: "8. Which security measure helps protect a wireless network from unauthorized access?", o: ["A. Leaving the Wi-Fi open for everyone", "B. Using strong passwords and encryption", "C. Ignoring software updates", "D. Disabling firewalls"] },
    { q: "9. Which of the following is an example of a Wireless Wide Area Network (WWAN)?", o: ["A. Bluetooth connection", "B. Wi-Fi in a coffee shop", "C. 4G or 5G mobile data connection", "D. Office LAN"] },
    { q: "10. What is the main purpose of wireless networks in modern society?", o: ["A. To make internet access slower", "B. To reduce the need for all electronic devices", "C. To enable convenient and flexible communication and data sharing", "D. To replace all mobile phones with cables"] }
];

const tleIct10Questions = [
    { q: "1. What is web hosting?", o: ["A. A computer programming language for creating websites", "B. A service that stores website files and makes them accessible on the internet", "C. The design layout of a webpage", "D. A social media platform for businesses"] },
    { q: "2. What is the main purpose of a web host?", o: ["A. To design website templates", "B. To connect users directly to search engines", "C. To store and deliver website files to users when they visit a website", "D. To create domain names"] },
    { q: "3. Which of the following best describes a server in web hosting?", o: ["A. A person who manages websites", "B. A powerful computer that stores and provides website data", "C. A device used to browse websites", "D. A network cable used for connections"] },
    { q: "4. In the web hosting process, what happens when a user types a domain name (e.g., www.example.com)?", o: ["A. The website’s files are deleted", "B. The browser connects to the web host’s server to display the website", "C. The domain name changes automatically", "D. The computer shuts down"] },
    { q: "5. Which type of hosting allows multiple websites to share the same server and resources?", o: ["A. Cloud Hosting", "B. Shared Hosting", "C. Dedicated Hosting", "D. VPS Hosting"] },
    { q: "6. What type of web hosting provides a single website with full control of an entire server?", o: ["A. Shared Hosting", "B. Cloud Hosting", "C. Dedicated Hosting", "D. WordPress Hosting"] },
    { q: "7. Which of the following types of hosting is best for small or beginner websites because it is affordable and easy to set up?", o: ["A. Shared Hosting", "B. VPS Hosting", "C. Dedicated Hosting", "D. Cloud Hosting"] },
    { q: "8. Which type of hosting is designed specifically for websites built using WordPress?", o: ["A. Cloud Hosting", "B. Free Hosting", "C. VPS Hosting", "D. WordPress Hosting"] },
    { q: "9. Which factor should you consider when choosing a web host?", o: ["A. The color of the company logo", "B. Security, uptime, and customer support", "C. The number of pages on your website", "D. The country of the designer"] },
    { q: "10. Which of the following statements is true about web hosting?", o: ["A. It is optional if you already have a domain name.", "B. It allows websites to be available and accessible online 24/7.", "C. It is only used by large businesses.", "D. It can only be done through mobile data networks."] }
];


interface MainContentProps {
  selectedCourse: Course | null;
}

const English9Content: React.FC = () => {
  const [showActivity, setShowActivity] = useState(false);

  if (showActivity) {
    return (
      <QuizActivity
        courseName={Course.ENGLISH_9}
        activityTitle="Required Activity: Interpreting a Poster"
        activityInstructions="INSTRUCTIONS: View the image poster and interpret the data and message conveyed. Answer the question that follows."
        questions={english9Questions}
        posterUrl="https://i.imgur.com/tHndLn8.png"
        onBack={() => setShowActivity(false)}
        onExit={() => setShowActivity(false)}
      />
    );
  }

  return (
    <div className="text-left animate-fade-in text-gray-700 dark:text-gray-300 space-y-4">
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4 text-center">
        Topic: Interpret the Message Conveyed in a Material Viewed
      </h2>

      <div>
        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800 dark:text-white">I. Introduction</h3>
        <p className="text-justify">
          In today’s multimedia-driven world, we are constantly exposed to various materials that communicate messages — from television commercials and social media posts to films, infographics, and even memes. To be an effective and critical viewer, one must be able to interpret the message that these materials convey. Interpretation goes beyond simply understanding what is shown; it involves analyzing what the material truly means, why it was created, and how it affects the audience.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800 dark:text-white">II. Understanding the Concept of Interpretation</h3>
        <p className="text-justify">
          Interpretation means making sense of the meaning behind something that is seen, heard, or read. In the context of viewing materials, it refers to understanding the ideas, emotions, or values that the creator wants to express. When we interpret, we do not just take information at face value — we think critically, analyze the content, and consider both the explicit (stated) and implicit (implied) messages.
        </p>
        <p className="mt-4 p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg italic text-justify">
          <strong>Example:</strong> A commercial showing happy families eating together may explicitly promote a food product, but implicitly it may convey a message about the importance of family bonding and happiness.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800 dark:text-white">III. Types of Materials That Convey Messages</h3>
        <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white">Visual Media</h4>
              <p className="ml-4 text-justify">Posters, paintings, photographs, cartoons, infographics. Use color, composition, and imagery to express messages.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white">Audio-Visual Media</h4>
              <p className="ml-4 text-justify">Movies, documentaries, advertisements, music videos. Combine sound, visuals, and storytelling to influence viewers emotionally.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white">Digital and Social Media</h4>
              <p className="ml-4 text-justify">Memes, reels, vlogs, and online campaigns. Often deliver short but powerful messages, sometimes using humor or symbolism.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white">Printed Media</h4>
              <p className="ml-4 text-justify">Magazines, newspapers, brochures. Use headlines, images, and layout to highlight key messages.</p>
            </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800 dark:text-white">IV. Steps in Interpreting a Material Viewed</h3>
        <p>To interpret effectively, follow these steps:</p>
        <ol className="list-decimal list-outside space-y-4 mt-4 ml-5">
          <li>
            <strong>Observe</strong>
            <ul className="list-disc list-outside ml-5 mt-1 space-y-1">
              <li>Pay close attention to what you see and hear.</li>
              <li>Identify important details such as characters, setting, objects, colors, and background music.</li>
            </ul>
          </li>
          <li>
            <strong>Understand the Context</strong>
            <ul className="list-disc list-outside ml-5 mt-1 space-y-1">
              <li>Consider the situation, culture, or time period in which the material was made.</li>
              <li>Ask: Who created this material? Why was it made? Who is the target audience?</li>
            </ul>
          </li>
          <li>
            <strong>Identify the Main Message</strong>
            <ul className="list-disc list-outside ml-5 mt-1 space-y-1">
              <li>Determine the central idea or theme being communicated.</li>
              <li>Ask: What is the creator trying to tell or show me?</li>
            </ul>
          </li>
          <li>
            <strong>Analyze the Techniques Used</strong>
            <ul className="list-disc list-outside ml-5 mt-1 space-y-1">
              <li>Look at how visuals, sounds, language, and symbols are used.</li>
              <li>Techniques may include:
                  <ul className="list-disc list-outside ml-5 mt-1 space-y-1">
                      <li>Color psychology (e.g., red for passion, blue for calmness)</li>
                      <li>Music or sound effects (e.g., suspenseful music to create tension)</li>
                      <li>Camera angles or lighting (e.g., dark lighting for mystery)</li>
                      <li>Slogans or captions that emphasize meaning</li>
                  </ul>
              </li>
            </ul>
          </li>
          <li>
            <strong>Evaluate the Impact</strong>
            <ul className="list-disc list-outside ml-5 mt-1 space-y-1">
              <li>Reflect on how the material affects you or others.</li>
              <li>Does it make you feel inspired, sad, angry, or motivated?</li>
              <li>Is the message positive, misleading, or persuasive?</li>
            </ul>
          </li>
          <li>
            <strong>Draw a Conclusion</strong>
            <ul className="list-disc list-outside ml-5 mt-1 space-y-1">
              <li>Summarize your interpretation by explaining what you think the message is and why you think so.</li>
              <li>Support your conclusion with evidence from the material.</li>
            </ul>
          </li>
        </ol>
      </div>
      <div className="pt-6 text-center">
          <button onClick={() => setShowActivity(true)} className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-transform transform hover:scale-105">
              Proceed to Required Activity
          </button>
      </div>
    </div>
  );
};

const TleIct9Content: React.FC = () => {
  const [showActivity, setShowActivity] = useState(false);
  
  if (showActivity) {
    return (
      <QuizActivity
        courseName={Course.TLE_ICT_9}
        activityTitle="Required Activity: Wireless Networking Quiz"
        activityInstructions="INSTRUCTIONS: Answer the questions based on the lesson about Wireless Networks."
        questions={tleIct9Questions}
        onBack={() => setShowActivity(false)}
        onExit={() => setShowActivity(false)}
      />
    );
  }

  return (
    <div className="text-left animate-fade-in text-gray-700 dark:text-gray-300 space-y-4">
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4 text-center">
        Topic: Fundamentals of Wireless Networking
      </h2>

      <div>
        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800 dark:text-white">I. Introduction</h3>
        <p className="text-justify">
          In the modern digital age, communication and data sharing have become faster, more flexible, and more efficient — largely because of wireless networks. These networks allow devices to connect to the internet and communicate with each other without the use of physical cables. From homes and schools to offices and public spaces, wireless networks have become a vital part of how people work, learn, and connect every day.
        </p>
        <p className="mt-2 text-justify">
          Wireless networking technology has revolutionized the way people access information and communicate, making mobility and convenience possible in a world that thrives on constant connectivity.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800 dark:text-white">II. Definition of Wireless Network</h3>
        <p className="text-justify">
          A <strong>wireless network</strong> is a type of computer network that uses radio waves, infrared, or satellite signals instead of physical wires to transmit data between devices.
        </p>
        <p className="mt-2 text-justify">
          In simple terms, it allows computers, smartphones, tablets, printers, and other devices to connect and share information without being physically plugged in.
        </p>
        <p className="mt-4 p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg italic text-justify">
          <strong>Example:</strong> When you connect your phone to Wi-Fi at home or school, you are using a wireless network.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800 dark:text-white">III. Characteristics of a Wireless Network</h3>
        <ul className="list-disc list-outside ml-5 mt-1 space-y-2">
          <li><strong>Mobility and Flexibility:</strong> Users can move freely within the network’s coverage area while maintaining a connection. Ideal for devices like laptops, tablets, and smartphones.</li>
          <li><strong>Accessibility:</strong> Wireless networks make internet access possible even in areas where wired infrastructure is difficult to install.</li>
          <li><strong>Ease of Installation:</strong> No need for complicated wiring systems, making setup faster and more convenient.</li>
          <li><strong>Scalability:</strong> New devices can be easily added to the network without additional cables.</li>
          <li><strong>Interconnectivity:</strong> Enables devices to share data, files, and internet connections seamlessly.</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800 dark:text-white">IV. Types of Wireless Networks</h3>
        <p className="text-justify">Wireless networks can be classified based on their coverage area and purpose:</p>
        <ol className="list-decimal list-outside space-y-3 mt-4 ml-5">
          <li><strong>Wireless Personal Area Network (WPAN):</strong> Covers a small area, typically a few meters. Used for connecting personal devices like smartphones, Bluetooth headsets, and smartwatches. (e.g., Bluetooth, Infrared)</li>
          <li><strong>Wireless Local Area Network (WLAN):</strong> Covers a limited area such as a home, school, or office. Uses Wi-Fi technology to connect computers and mobile devices. (e.g., Home Wi-Fi routers)</li>
          <li><strong>Wireless Metropolitan Area Network (WMAN):</strong> Covers a larger area like a city or campus. Provides high-speed internet access using technologies such as WiMAX. (e.g., City-wide Wi-Fi networks)</li>
          <li><strong>Wireless Wide Area Network (WWAN):</strong> Covers broad geographic areas, such as regions or countries. Uses cellular networks (3G, 4G, 5G) and satellites for communication. (e.g., Mobile data networks)</li>
          <li><strong>Wireless Sensor Network (WSN):</strong> Consists of distributed sensors that collect and transmit data wirelessly. Commonly used in environmental monitoring, agriculture, and security systems. (e.g., Smart farming sensors)</li>
        </ol>
      </div>

      <div>
        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800 dark:text-white">V. Components of a Wireless Network</h3>
        <ul className="list-disc list-outside ml-5 mt-1 space-y-2">
          <li><strong>Access Point (AP):</strong> A device that acts as a central hub, allowing wireless devices to connect to a wired network.</li>
          <li><strong>Wireless Router:</strong> Connects devices to the internet through Wi-Fi and manages network traffic.</li>
          <li><strong>Wireless Network Interface Card (NIC):</strong> A hardware component in computers or mobile devices that enables wireless communication.</li>
          <li><strong>Antennas:</strong> Used to transmit and receive radio signals.</li>
          <li><strong>Modem:</strong> Connects the wireless network to the internet service provider (ISP).</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800 dark:text-white">VI. Advantages of Wireless Networks</h3>
        <ul className="list-disc list-outside ml-5 mt-1 space-y-2">
          <li><strong>Mobility:</strong> Users can move freely within the network area without losing connection.</li>
          <li><strong>Convenience:</strong> No need for messy cables or fixed ports.</li>
          <li><strong>Easy Expansion:</strong> New users can be added without rewiring.</li>
          <li><strong>Cost-Effective Installation:</strong> Reduces the need for physical infrastructure.</li>
          <li><strong>Accessibility in Remote Areas:</strong> Enables connectivity where laying cables is impractical.</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800 dark:text-white">VII. Disadvantages of Wireless Networks</h3>
        <ul className="list-disc list-outside ml-5 mt-1 space-y-2">
          <li><strong>Security Risks:</strong> Susceptible to hacking and unauthorized access if not properly protected.</li>
          <li><strong>Interference:</strong> Other electronic devices or obstacles can disrupt signals.</li>
          <li><strong>Limited Range:</strong> Wireless signals weaken with distance and physical barriers.</li>
          <li><strong>Lower Speed Compared to Wired:</strong> Generally slower than Ethernet connections.</li>
          <li><strong>Power Consumption:</strong> Wireless devices may drain batteries faster due to constant signal searching.</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800 dark:text-white">VIII. Security Measures for Wireless Networks</h3>
        <p className="text-justify">To maintain a safe and reliable wireless connection, the following security practices are important:</p>
        <ul className="list-disc list-outside ml-5 mt-2 space-y-2">
          <li>Use Strong Passwords (WPA3/WPA2 encryption).</li>
          <li>Enable Network Firewalls.</li>
          <li>Regularly Update Firmware.</li>
          <li>Turn Off SSID Broadcasting (for private networks).</li>
          <li>Use VPN (Virtual Private Network) for public Wi-Fi.</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800 dark:text-white">IX. Real-Life Applications of Wireless Networks</h3>
        <ul className="list-disc list-outside ml-5 mt-1 space-y-2">
          <li><strong>Education:</strong> Schools use Wi-Fi for e-learning and digital classrooms.</li>
          <li><strong>Business:</strong> Companies rely on wireless connections for remote work and communication.</li>
          <li><strong>Healthcare:</strong> Wireless sensors monitor patient health in real time.</li>
          <li><strong>Transportation:</strong> Airports and trains offer Wi-Fi for travelers.</li>
          <li><strong>Smart Homes:</strong> Devices like lights, cameras, and thermostats are connected wirelessly for automation.</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800 dark:text-white">X. Conclusion</h3>
        <p className="text-justify">
          Wireless networks have transformed how people communicate, learn, and do business by making connectivity portable, efficient, and accessible. While they offer convenience and flexibility, they also require careful management and security measures to ensure safe and reliable communication. Understanding wireless networks equips students with the knowledge to navigate and make the most out of the digital world.
        </p>
      </div>
      <div className="pt-6 text-center">
        <button onClick={() => setShowActivity(true)} className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-transform transform hover:scale-105">
          Proceed to Required Activity
        </button>
      </div>
    </div>
  );
};


const TleIct10Content: React.FC = () => {
  const [showActivity, setShowActivity] = useState(false);

  if (showActivity) {
    return (
      <QuizActivity
        courseName={Course.TLE_ICT_10}
        activityTitle="Required Activity: Web Hosting Quiz"
        activityInstructions="INSTRUCTIONS: Answer the questions based on the lesson about Web Hosting."
        questions={tleIct10Questions}
        onBack={() => setShowActivity(false)}
        onExit={() => setShowActivity(false)}
      />
    );
  }

  return (
    <div className="text-left animate-fade-in text-gray-700 dark:text-gray-300 space-y-4">
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4 text-center">
        Topic: Web Hosting
      </h2>

      <div>
        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800 dark:text-white">I. Introduction</h3>
        <p className="text-justify">
          In today’s digital world, having an online presence is essential for individuals, businesses, and organizations. Whether it’s a school website, an online store, or a personal blog, every website you visit on the internet is stored and made accessible through a process known as web hosting.
        </p>
        <p className="mt-2 text-justify">
          Web hosting plays a key role in allowing people all over the world to view, access, and interact with websites anytime and anywhere. Understanding what web hosting is, how it works, and its types is crucial for ICT students who want to learn about how the internet functions behind the scenes.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800 dark:text-white">II. Definition of Web Hosting</h3>
        <p className="text-justify">
          <strong>Web hosting</strong> is a service that provides storage space and access for websites on the internet.
        </p>
        <p className="mt-2 text-justify">
          In simple terms, web hosting is like renting space on a computer (called a server) where all the files, images, videos, and content of your website are stored. When users type your website address (domain name) in a browser, the web host’s server delivers your website to their screen.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800 dark:text-white">III. How Web Hosting Works</h3>
        <p className="text-justify">Here’s a step-by-step explanation of how web hosting functions:</p>
        <ol className="list-decimal list-outside space-y-2 mt-4 ml-5">
            <li>You create a website – using HTML, website builders, or a content management system (like WordPress).</li>
            <li>You choose a web host – a company that provides servers connected to the internet.</li>
            <li>You upload your website files – to the web host’s server.</li>
            <li>A user types your domain name – such as www.example.com in a browser.</li>
            <li>The web host’s server delivers your files – so the user can view your website on their device.</li>
        </ol>
        <p className="mt-4 p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg italic text-justify">
          <strong>Analogy:</strong> Think of your domain name as your home’s address, and web hosting as the actual house where your furniture (website files) is stored.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800 dark:text-white">IV. Components of Web Hosting</h3>
        <ul className="list-disc list-outside ml-5 mt-1 space-y-2">
            <li><strong>Server:</strong> A powerful computer that stores and delivers website files.</li>
            <li><strong>Bandwidth:</strong> The amount of data that can be transferred between your website and its users.</li>
            <li><strong>Storage Space:</strong> The total space available for your website’s files.</li>
            <li><strong>Uptime:</strong> The amount of time a website is available and running online (measured in percentage, e.g., 99.9%).</li>
            <li><strong>Control Panel (cPanel):</strong> A user interface that allows you to manage your website, email, and files.</li>
            <li><strong>Domain Name System (DNS):</strong> Connects your website’s domain name to the correct server address.</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800 dark:text-white">V. Types of Web Hosting</h3>
        <p className="text-justify">Different websites require different hosting types depending on their size, purpose, and traffic. The main types are:</p>
        <ol className="list-decimal list-outside space-y-3 mt-4 ml-5">
            <li><strong>Shared Hosting:</strong> Many websites share the same server and resources. Best for beginners, small websites, or personal blogs.</li>
            <li><strong>Virtual Private Server (VPS) Hosting:</strong> The server is divided into virtual sections, and each website has its own dedicated resources. Best for medium-sized websites or growing businesses.</li>
            <li><strong>Dedicated Hosting:</strong> One server is fully dedicated to one website only. Best for large companies or websites with high traffic.</li>
            <li><strong>Cloud Hosting:</strong> Uses multiple connected servers (the “cloud”) to host websites. Best for businesses that need flexibility and scalability.</li>
            <li><strong>WordPress Hosting:</strong> Specifically designed and optimized for WordPress websites. Best for bloggers, educators, and content creators using WordPress.</li>
            <li><strong>Free Hosting:</strong> Provided at no cost but with limited features. Best for practice or educational use.</li>
        </ol>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800 dark:text-white">VI. Importance of Web Hosting</h3>
        <ul className="list-disc list-outside ml-5 mt-1 space-y-2">
            <li><strong>Makes Websites Accessible:</strong> Allows users worldwide to view your website anytime.</li>
            <li><strong>Ensures Performance and Speed:</strong> Reliable hosting keeps your site loading fast and efficiently.</li>
            <li><strong>Supports Security:</strong> Web hosts provide SSL certificates, firewalls, and backups to protect data.</li>
            <li><strong>Allows Professional Email:</strong> Enables creation of business email addresses (e.g., info@yourdomain.com).</li>
            <li><strong>Provides Technical Support:</strong> Hosting services offer assistance for managing websites.</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800 dark:text-white">VII. Factors to Consider When Choosing a Web Host</h3>
        <ul className="list-disc list-outside ml-5 mt-1 space-y-2">
            <li>Reliability and Uptime Guarantee</li>
            <li>Speed and Performance</li>
            <li>Storage and Bandwidth</li>
            <li>Customer Support Availability</li>
            <li>Pricing and Scalability</li>
            <li>Security Features (SSL, backups, etc.)</li>
            <li>Ease of Use (Control Panel and Tools)</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800 dark:text-white">VIII. Common Examples of Web Hosting Providers</h3>
        <ul className="list-disc list-outside ml-5 mt-1 space-y-2">
            <li><strong>Free Hosts:</strong> Google Sites, InfinityFree, 000WebHost</li>
            <li><strong>Paid Hosts:</strong> GoDaddy, Bluehost, HostGator, SiteGround, Namecheap</li>
            <li><strong>Cloud Hosts:</strong> Google Cloud, Amazon Web Services (AWS), Microsoft Azure</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800 dark:text-white">IX. Advantages of Web Hosting</h3>
        <ul className="list-disc list-outside ml-5 mt-1 space-y-2">
            <li>Website is available online 24/7.</li>
            <li>Provides tools to manage and update your website easily.</li>
            <li>Enhances credibility with custom domains and emails.</li>
            <li>Offers backup and protection services.</li>
            <li>Supports online growth and business operations.</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800 dark:text-white">X. Disadvantages of Web Hosting</h3>
        <ul className="list-disc list-outside ml-5 mt-1 space-y-2">
            <li>Paid plans can be expensive for small users.</li>
            <li>Technical issues may cause temporary downtime.</li>
            <li>Requires maintenance and updates.</li>
            <li>Shared servers may affect performance if overloaded.</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800 dark:text-white">XI. Conclusion</h3>
        <p className="text-justify">
          Web hosting is the foundation of every website on the internet. Without it, websites would not be visible or accessible to users. It allows individuals, schools, and organizations to share information globally in a fast, efficient, and secure way.
        </p>
        <p className="mt-2 text-justify">
          As ICT learners, understanding web hosting provides the knowledge needed to build, publish, and maintain websites — key skills in the digital and information-driven age.
        </p>
      </div>
      <div className="pt-6 text-center">
        <button onClick={() => setShowActivity(true)} className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-transform transform hover:scale-105">
          Proceed to Required Activity
        </button>
      </div>
    </div>
  );
};


const MainContent: React.FC<MainContentProps> = ({ selectedCourse }) => {

  const renderCourseContent = () => {
    switch (selectedCourse) {
      case Course.ENGLISH_9:
        return <English9Content />;
      case Course.TLE_ICT_9:
        return <TleIct9Content />;
      case Course.TLE_ICT_10:
        return <TleIct10Content />;
      default:
        return (
          <div className="text-center animate-fade-in">
            <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-3">
              Welcome to {selectedCourse}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              This is the main content area for your selected course. Future lessons, activities, and resources will appear here. Get ready to learn!
            </p>
            <button className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-transform transform hover:scale-105">
              Start Learning
            </button>
          </div>
        );
    }
  };
  
  return (
    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
      {!selectedCourse ? (
        <div className="min-h-[250px] flex items-center justify-center">
            <div className="text-center text-gray-500 dark:text-gray-400">
                <h3 className="text-xl font-medium text-gray-800 dark:text-white">Select a Course</h3>
                <p className="mt-1 text-md">
                    Choose a course from the dropdown above to get started.
                </p>
            </div>
        </div>
      ) : (
        <div className={![Course.ENGLISH_9, Course.TLE_ICT_9, Course.TLE_ICT_10].includes(selectedCourse) ? "min-h-[250px] flex items-center justify-center" : ""}>
            {renderCourseContent()}
        </div>
      )}
    </div>
  );
};

export default MainContent;
