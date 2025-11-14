type BackgroundProps = {
  imgPath: string;
};

export default function Background({ imgPath }: BackgroundProps) {
  return (
    <div>
      <img src={imgPath} className="w-full h-200 object-cover" />
    </div>
  );
}
