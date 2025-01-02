const Footer = () => {
  return (
    <footer className="bg-black text-white mt-auto flex flex-col">
      <div className="lg:px-40 md:px-20 py-8 text-white">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="border border-footerBorder rounded-xl m-4 p-4 flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-2 text-navbarActive">
              CONNECT WITH US
            </h3>
            <ul className="text-logoAsh">
              <li>+91 9567843340</li>
              <li>info@deepnetsoft.com</li>
            </ul>
          </div>
          <div className="border border-footerBorder rounded-xl m-4 p-4 flex flex-col items-center">
            <div className="flex flex-col items-center justify-center">
              <img
                src="/logo.png"
                alt="Deepnetsoft Logo"
                className="w-14 h-14 object-cover relative bottom-12"
              />
              <div className="relative bottom-6 ">
                <div className="text-xl">
                  <span className="text-navbarActive">DEEP</span> NET
                  <span className="text-xl text-logoAsh"> SOFT</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-footerBorder rounded-xl m-4 p-4 flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-2 text-navbarActive">
              Find Us
            </h3>
            <ul className="text-logoAsh">
              <li>First floor, Geo infopark,</li>
              <li>Infopark EXPY, Kakkanad</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-around items-center bg-footerBg text-footerText font-lato h-20 ">
        <p>&copy; 2024 Deepnetsoft Solutions. All rights reserved.</p>
        <div className="flex">
          <p>Terms&conditions</p>
          <p className="ml-5">Privacy Policy</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
