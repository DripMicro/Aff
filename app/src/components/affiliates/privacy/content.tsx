interface ContentProp {
  content: string;
}

const Content = (props: ContentProp) => {
  return (
    <ul className="list-disc list-outside">
      <li className="pb-3 md:pb-5 list-none">{props.content}</li>
    </ul>
  );
};

export default Content;
