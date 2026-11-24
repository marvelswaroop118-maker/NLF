export default function PageHeading({ embedded = false, children, ...props }) {
  const Heading = embedded ? 'h2' : 'h1';
  return <Heading {...props}>{children}</Heading>;
}
