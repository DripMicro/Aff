interface ContentProp {
  content: string;
}

const Content = (props: ContentProp) => {
  return (
    <ul className="list-outside list-disc">
      <li className="list-none pb-3 md:pb-5">{props.content}</li>
    </ul>
  );
};

export default Content;
