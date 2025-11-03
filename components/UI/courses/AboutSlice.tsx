type AboutSliceProps = {
  coursName: string;
  description: string;
};

const AboutSlice = ({ coursName, description }: AboutSliceProps) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">{coursName}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
export default AboutSlice;
