const StoryPreview = () => {
  return (
    <div className="text-center lg:py-80 py-20 flex flex-col items-center gap-12 border-stone-300 border-y">
      <h2 className="lg:text-5xl text-3xl font-light tracking-wide">UNA HISTORIA QUE SE ESCRIBE CON EL TIEMPO.</h2>
      <p className="md:max-w-2xl max-w-xs lg:text-xl text-base leading-relaxed font-extralight">
        Todo comienza con pequeños momentos que, sin darse cuenta, se vuelven
        importantes. Esta es una historia hecha de recuerdos, caminos
        compartidos y capítulos que siguen escribiéndose.
      </p>
      <button className="my-7">Lee nuestra historia</button>
    </div>
  );
};

export default StoryPreview;
