type BackgroundProps = {
  imgPath: string;
};

export default function Background({ imgPath }: BackgroundProps) {
  return (
    <div>
      <img src={imgPath} className="w-full h-full object-cover" />
    </div>
  );
}
