import { content } from './content';

export const AIIntegrationPage = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">{content.title}</h2>
      <p>{content.description}</p>
    </div>
  );
};
