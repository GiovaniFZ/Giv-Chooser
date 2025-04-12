import packageJson from '../../../package.json';

export function About() {
  return (
    <div>
      <h1>Giv&apos;s Chooser</h1>
      <h2>{packageJson.description}</h2>
      <p>Version: {packageJson.version}</p>
      <p>With ❤️ By: {packageJson.author}</p>
    </div>
  );
}
