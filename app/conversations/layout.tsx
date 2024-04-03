import getConversations from "../actions/getConversation";
import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList.tsx";

export default async function ConversationsLayout({
  children
}: {
  children: React.ReactNode,
}) {
 
  const users = await getUsers();
 const conversations= await getConversations();
  return (
   
    <Sidebar>
      <div className="h-full">
      <ConversationList
         
          initialItems={conversations}
        />
        {children}
      </div>
    </Sidebar>
  );
}