const Showroom = () => {
  return (
    <div className="h-screen flex items-center justify-center px-4">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.736677397607!2d105.76154267520933!3d20.963087280669914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454cabc683f57%3A0xdb02223a0620af21!2zxJDhuqFpIGjhu41jIE5ndXnhu4VuIFRyw6Np!5e0!3m2!1svi!2s!4v1702361267526!5m2!1svi!2s"
        width="600"
        height="450"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Showroom;
