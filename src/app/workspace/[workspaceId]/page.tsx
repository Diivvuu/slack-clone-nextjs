interface WorkSpaceIdPageProps {
  params: {
    workspaceId: string;
  };
}
const workSpaceId = ({ params }: WorkSpaceIdPageProps) => {
  return <div>workSpaceId ID : {params.workspaceId}</div>;
};

export default workSpaceId;
