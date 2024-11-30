import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('750ec099-ce18-4246-8fd8-42b91fc6fc43', '9Scottie.Price@yahoo.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=11', 'inv012jkl', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('2a69a6c9-fa4f-4f91-9a8e-5fcbd96273ce', '17Favian_Zboncak@yahoo.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=19', 'inv789ghi', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('bb44d95d-4334-4c87-b103-87c550653c3a', '25Dimitri87@gmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=27', 'inv789ghi', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('2aba78d2-7b3c-43c9-b6e1-ceb70381b216', '33Amanda71@hotmail.com', 'Michael Brown', 'https://i.imgur.com/YfJQV5z.png?id=35', 'inv123abc', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('e3adc50e-1824-42a4-a24d-7355121dd522', '41Wallace_Wisoky7@yahoo.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=43', 'inv012jkl', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('422fe4e9-b418-4861-ae8a-b6b41ad7cece', '49Abbie_Pfeffer@gmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=51', 'inv123abc', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('4d803990-067f-499c-9a35-a34582f1479f', '57Coy_Tremblay70@gmail.com', 'Michael Brown', 'https://i.imgur.com/YfJQV5z.png?id=59', 'inv456def', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('903e8968-8450-47cc-90b5-dee4abfba5c6', '65Deven_Huel@yahoo.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=67', 'inv456def', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('3fff03d4-7648-4fe4-a678-0d086c6ccfca', '73Dee57@gmail.com', 'Emily Jones', 'https://i.imgur.com/YfJQV5z.png?id=75', 'inv123abc', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('18393817-005f-4b4b-abc7-ce54c64e6fa8', 'AI Pioneers Co.', 'https://i.imgur.com/YfJQV5z.png?id=82');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('430947cc-4d5f-43f8-9733-e744c48f52ac', 'Future Enterprises', 'https://i.imgur.com/YfJQV5z.png?id=85');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('8390bfc3-ab52-428f-b085-7069e1accdc1', 'Digital Ventures LLC', 'https://i.imgur.com/YfJQV5z.png?id=88');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('b391ab79-e6e2-4eb3-be90-16f1d5609a82', 'Digital Ventures LLC', 'https://i.imgur.com/YfJQV5z.png?id=91');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('6722a168-ce09-419a-8ca9-4b6faa1561a5', 'Future Enterprises', 'https://i.imgur.com/YfJQV5z.png?id=94');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('863ec575-6d4a-46f1-a6f4-701cad0a4b6d', 'Digital Ventures LLC', 'https://i.imgur.com/YfJQV5z.png?id=97');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('89b3c7df-e775-4fa1-8580-57041c313266', 'AI Pioneers Co.', 'https://i.imgur.com/YfJQV5z.png?id=100');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('94ae2b3a-2b5d-4ee8-af69-ad0ec99bb22c', 'Digital Ventures LLC', 'https://i.imgur.com/YfJQV5z.png?id=103');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('1efc1892-b9e8-491c-afe7-ef60f1f27b7e', 'Tech Innovators Inc.', 'https://i.imgur.com/YfJQV5z.png?id=106');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('870fb97b-a1a7-4c88-8351-653c722ee38c', 'Global Solutions Ltd.', 'https://i.imgur.com/YfJQV5z.png?id=109');

INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('8d35b767-81a6-46ed-b2e9-8fbfde3b9f1c', 'Support Specialist', '4d803990-067f-499c-9a35-a34582f1479f', '89b3c7df-e775-4fa1-8580-57041c313266');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('76a82b18-91ea-4a85-a428-7501b9cef093', 'Support Specialist', '750ec099-ce18-4246-8fd8-42b91fc6fc43', '6722a168-ce09-419a-8ca9-4b6faa1561a5');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('57c9d957-754f-4acf-a835-96ebf0b45298', 'Sales Manager', '903e8968-8450-47cc-90b5-dee4abfba5c6', '94ae2b3a-2b5d-4ee8-af69-ad0ec99bb22c');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('50a4ed07-0f71-483d-9afd-839176ac98df', 'Admin', 'e3adc50e-1824-42a4-a24d-7355121dd522', '870fb97b-a1a7-4c88-8351-653c722ee38c');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('2c844a9e-70ee-4b9a-855f-84366e8322c5', 'Admin', 'bb44d95d-4334-4c87-b103-87c550653c3a', '430947cc-4d5f-43f8-9733-e744c48f52ac');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('63b2a0b1-c920-4c53-ba61-879f78dcaa9d', 'Admin', '750ec099-ce18-4246-8fd8-42b91fc6fc43', '863ec575-6d4a-46f1-a6f4-701cad0a4b6d');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('40db2707-ee39-4552-b093-0f8151141965', 'Support Specialist', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '8390bfc3-ab52-428f-b085-7069e1accdc1');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('4167f0b3-c447-48a5-b98b-f4865cd451e3', 'Sales Manager', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '89b3c7df-e775-4fa1-8580-57041c313266');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('677d5891-fccb-4a25-9b5e-bbc509a2fc96', 'Sales Manager', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '18393817-005f-4b4b-abc7-ce54c64e6fa8');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('d87d9380-843f-4f85-aa00-98d4d33af79c', 'Admin', '422fe4e9-b418-4861-ae8a-b6b41ad7cece', '863ec575-6d4a-46f1-a6f4-701cad0a4b6d');

INSERT INTO "Agent" ("id", "name", "status", "whatsappIntegrationDetails", "configuration", "organizationId") VALUES ('7847bdff-4847-4677-a97b-965867bcc8b1', 'SupportBot 3000', 'archived', '{"vilicus":"defessus","vaco":"theca","cubo":"apostolus","celer":"cinis","verto":"claudeo"}'::jsonb, '{"voluptatem":"clementia","atqui":"amita","carpo":"animi","veniam":"admoneo"}'::jsonb, '870fb97b-a1a7-4c88-8351-653c722ee38c');
INSERT INTO "Agent" ("id", "name", "status", "whatsappIntegrationDetails", "configuration", "organizationId") VALUES ('b811229e-7597-41ed-bb06-8b0e83d526da', 'SupportBot 3000', 'archived', '{"uterque":"cupiditate","color":"armarium","pecus":"sumptus","dolores":"adipisci","carcer":"cognomen"}'::jsonb, '{"tero":"acer","spiritus":"creo","sponte":"vox","tenus":"thymbra"}'::jsonb, 'b391ab79-e6e2-4eb3-be90-16f1d5609a82');
INSERT INTO "Agent" ("id", "name", "status", "whatsappIntegrationDetails", "configuration", "organizationId") VALUES ('94867bad-0a27-43ec-92dc-ed74cc6f5134', 'Assistant AI', 'inactive', '{"approbo":"cibus","quam":"defungo","aperiam":"tracto","creator":"quidem"}'::jsonb, '{"vox":"sono","paens":"demitto","odit":"denuo"}'::jsonb, '863ec575-6d4a-46f1-a6f4-701cad0a4b6d');
INSERT INTO "Agent" ("id", "name", "status", "whatsappIntegrationDetails", "configuration", "organizationId") VALUES ('f16f655b-ca66-469e-85fb-7a747b23da57', 'HelpDesk Pro', 'pending', '{"vel":"damno","ipsum":"basium","auxilium":"deprecator","decretum":"tum","agnosco":"turba"}'::jsonb, '{"alioqui":"cogito","veniam":"hic","triumphus":"bos"}'::jsonb, '8390bfc3-ab52-428f-b085-7069e1accdc1');
INSERT INTO "Agent" ("id", "name", "status", "whatsappIntegrationDetails", "configuration", "organizationId") VALUES ('400f2d4c-ee15-4ac2-b7df-0a1c76782731', 'SupportBot 3000', 'inactive', '{"deficio":"volutabrum","sollers":"maxime","colo":"arbor","tolero":"possimus","cernuus":"thymum"}'::jsonb, '{"sollers":"adulescens","strenuus":"cauda","derelinquo":"mollitia","asper":"vis"}'::jsonb, '89b3c7df-e775-4fa1-8580-57041c313266');
INSERT INTO "Agent" ("id", "name", "status", "whatsappIntegrationDetails", "configuration", "organizationId") VALUES ('fca16df8-b685-4fa9-af20-5784ee526a9f', 'SalesGuru', 'archived', '{"sollers":"tamquam","ad":"aggero","cresco":"vado","arca":"dignissimos"}'::jsonb, '{"cribro":"arto","vito":"trans","aurum":"accusamus","conculco":"cunctatio","cultellus":"adimpleo"}'::jsonb, '18393817-005f-4b4b-abc7-ce54c64e6fa8');
INSERT INTO "Agent" ("id", "name", "status", "whatsappIntegrationDetails", "configuration", "organizationId") VALUES ('f01ca3b3-27d1-4945-a84d-8858132a2866', 'SalesGuru', 'pending', '{"attonbitus":"asperiores","repellat":"quae","cogo":"compono","corroboro":"ter","agnitio":"delectus"}'::jsonb, '{"contigo":"dedico","spargo":"tepidus","amplus":"vindico","capitulus":"solutio"}'::jsonb, '1efc1892-b9e8-491c-afe7-ef60f1f27b7e');
INSERT INTO "Agent" ("id", "name", "status", "whatsappIntegrationDetails", "configuration", "organizationId") VALUES ('a329aea2-cb8a-421a-81c0-b40bf5706696', 'Assistant AI', 'pending', '{"non":"delego","cursim":"volutabrum","pauci":"triumphus"}'::jsonb, '{"comes":"calculus","appello":"somniculosus","deprimo":"denuncio"}'::jsonb, '430947cc-4d5f-43f8-9733-e744c48f52ac');
INSERT INTO "Agent" ("id", "name", "status", "whatsappIntegrationDetails", "configuration", "organizationId") VALUES ('2cfac4e5-65e7-433e-af64-225098a3e1e6', 'SalesGuru', 'inactive', '{"civis":"caries","angelus":"dolore","terreo":"thesis","vomica":"sublime","carbo":"uterque"}'::jsonb, '{"sol":"suppellex","absconditus":"vulgo","coniecto":"aestus"}'::jsonb, '94ae2b3a-2b5d-4ee8-af69-ad0ec99bb22c');
INSERT INTO "Agent" ("id", "name", "status", "whatsappIntegrationDetails", "configuration", "organizationId") VALUES ('d86f0f8f-2b7f-45b4-9a87-e8c82a242b4b', 'SupportBot 3000', 'archived', '{"optio":"timidus","cunae":"patria","subiungo":"vilis","basium":"tabgo","beatae":"auctus"}'::jsonb, '{"clamo":"delego","pauci":"utilis","audeo":"thermae","quae":"solitudo"}'::jsonb, '863ec575-6d4a-46f1-a6f4-701cad0a4b6d');

INSERT INTO "Template" ("id", "name", "content", "organizationId") VALUES ('43fd365e-f921-4b1f-8263-6e0b23fc9c42', 'Feedback Request', 'Obrigado por entrar em contato com o suporte. Estamos aqui para ajudar', '89b3c7df-e775-4fa1-8580-57041c313266');
INSERT INTO "Template" ("id", "name", "content", "organizationId") VALUES ('921a7b0e-b4df-4e34-a22a-e73243c53c30', 'Feedback Request', 'Obrigado por entrar em contato com o suporte. Estamos aqui para ajudar', '8390bfc3-ab52-428f-b085-7069e1accdc1');
INSERT INTO "Template" ("id", "name", "content", "organizationId") VALUES ('88c01211-1437-41ee-8f71-02c16461e63a', 'Support Followup', 'Gostaramos de saber sua opinio sobre nosso servio. Por favor deixe seu feedback.', '94ae2b3a-2b5d-4ee8-af69-ad0ec99bb22c');
INSERT INTO "Template" ("id", "name", "content", "organizationId") VALUES ('beae495f-df66-45f2-9b35-57c783a39d07', 'Feedback Request', 'Seu pedido foi confirmado com sucesso. Obrigado por comprar conosco', '89b3c7df-e775-4fa1-8580-57041c313266');
INSERT INTO "Template" ("id", "name", "content", "organizationId") VALUES ('e16da593-aed1-4d5c-8dd5-98c83895ae72', 'Support Followup', 'Gostaramos de saber sua opinio sobre nosso servio. Por favor deixe seu feedback.', '1efc1892-b9e8-491c-afe7-ef60f1f27b7e');
INSERT INTO "Template" ("id", "name", "content", "organizationId") VALUES ('6411e27f-cb24-4df9-b220-13f77661cfc1', 'Feedback Request', 'Ol Como posso ajudlo hoje', 'b391ab79-e6e2-4eb3-be90-16f1d5609a82');
INSERT INTO "Template" ("id", "name", "content", "organizationId") VALUES ('dc6e9b49-6b32-4c3f-a419-f12af42d6e6d', 'Order Confirmation', 'Seu pedido foi confirmado com sucesso. Obrigado por comprar conosco', '1efc1892-b9e8-491c-afe7-ef60f1f27b7e');
INSERT INTO "Template" ("id", "name", "content", "organizationId") VALUES ('b773e3dd-6b4b-426d-a949-aaa396d8e1fa', 'Welcome Message', 'Lembrete Voc tem uma consulta agendada para amanh s 15h.', '94ae2b3a-2b5d-4ee8-af69-ad0ec99bb22c');
INSERT INTO "Template" ("id", "name", "content", "organizationId") VALUES ('269c776f-c35c-48a6-8e31-6f5b71a745b9', 'Feedback Request', 'Obrigado por entrar em contato com o suporte. Estamos aqui para ajudar', '870fb97b-a1a7-4c88-8351-653c722ee38c');
INSERT INTO "Template" ("id", "name", "content", "organizationId") VALUES ('4f78e75f-74c4-4500-8650-65c7a02e3e60', 'Order Confirmation', 'Obrigado por entrar em contato com o suporte. Estamos aqui para ajudar', 'b391ab79-e6e2-4eb3-be90-16f1d5609a82');

INSERT INTO "Conversation" ("id", "status", "customerPhoneNumber", "isResolved", "agentId", "organizationId") VALUES ('3ec8f4e1-8b6c-48ac-8b37-60ae3bd1bb10', 'resolved', '5511954321098', true, 'f16f655b-ca66-469e-85fb-7a747b23da57', '6722a168-ce09-419a-8ca9-4b6faa1561a5');
INSERT INTO "Conversation" ("id", "status", "customerPhoneNumber", "isResolved", "agentId", "organizationId") VALUES ('31b9898e-0459-4a7d-add6-768f62b5a4e4', 'closed', '5511976543210', true, 'fca16df8-b685-4fa9-af20-5784ee526a9f', '863ec575-6d4a-46f1-a6f4-701cad0a4b6d');
INSERT INTO "Conversation" ("id", "status", "customerPhoneNumber", "isResolved", "agentId", "organizationId") VALUES ('e8c7779c-c408-4675-8a81-2ba6ffbfb903', 'in_progress', '5511954321098', true, 'a329aea2-cb8a-421a-81c0-b40bf5706696', '863ec575-6d4a-46f1-a6f4-701cad0a4b6d');
INSERT INTO "Conversation" ("id", "status", "customerPhoneNumber", "isResolved", "agentId", "organizationId") VALUES ('1cbbab69-7b2e-445d-89e7-a478137bee66', 'resolved', '5511998765432', true, 'a329aea2-cb8a-421a-81c0-b40bf5706696', '6722a168-ce09-419a-8ca9-4b6faa1561a5');
INSERT INTO "Conversation" ("id", "status", "customerPhoneNumber", "isResolved", "agentId", "organizationId") VALUES ('81c19e2a-c58b-49e9-8c41-78ae0804d8e3', 'resolved', '5511965432109', true, '94867bad-0a27-43ec-92dc-ed74cc6f5134', '863ec575-6d4a-46f1-a6f4-701cad0a4b6d');
INSERT INTO "Conversation" ("id", "status", "customerPhoneNumber", "isResolved", "agentId", "organizationId") VALUES ('3854daa4-882a-457f-aa9c-673f30e95d30', 'active', '5511998765432', true, 'a329aea2-cb8a-421a-81c0-b40bf5706696', '6722a168-ce09-419a-8ca9-4b6faa1561a5');
INSERT INTO "Conversation" ("id", "status", "customerPhoneNumber", "isResolved", "agentId", "organizationId") VALUES ('49e8f751-1516-47d0-971b-de9d9ff55d34', 'active', '5511976543210', false, '7847bdff-4847-4677-a97b-965867bcc8b1', '870fb97b-a1a7-4c88-8351-653c722ee38c');
INSERT INTO "Conversation" ("id", "status", "customerPhoneNumber", "isResolved", "agentId", "organizationId") VALUES ('522e50ac-32c6-443b-aa56-b81d1aa3fa73', 'pending', '5511965432109', false, '2cfac4e5-65e7-433e-af64-225098a3e1e6', '18393817-005f-4b4b-abc7-ce54c64e6fa8');
INSERT INTO "Conversation" ("id", "status", "customerPhoneNumber", "isResolved", "agentId", "organizationId") VALUES ('d100ca48-8f90-4d0c-a9c4-087255ade2db', 'closed', '5511998765432', true, 'd86f0f8f-2b7f-45b4-9a87-e8c82a242b4b', '6722a168-ce09-419a-8ca9-4b6faa1561a5');
INSERT INTO "Conversation" ("id", "status", "customerPhoneNumber", "isResolved", "agentId", "organizationId") VALUES ('9b16c71e-95c3-45aa-adf0-83b554f8360f', 'resolved', '5511987654321', false, '400f2d4c-ee15-4ac2-b7df-0a1c76782731', '89b3c7df-e775-4fa1-8580-57041c313266');

INSERT INTO "Message" ("id", "content", "isFromAgent", "conversationId", "templateId") VALUES ('9f857a81-8664-45ca-8177-33c7afe03d0c', 'Ol como posso ajudar voc hoje', true, 'e8c7779c-c408-4675-8a81-2ba6ffbfb903', '43fd365e-f921-4b1f-8263-6e0b23fc9c42');
INSERT INTO "Message" ("id", "content", "isFromAgent", "conversationId", "templateId") VALUES ('229923d2-d004-4640-9b13-97f7713e1795', 'Aguarde um momento enquanto verifico as informaes.', true, 'd100ca48-8f90-4d0c-a9c4-087255ade2db', '921a7b0e-b4df-4e34-a22a-e73243c53c30');
INSERT INTO "Message" ("id", "content", "isFromAgent", "conversationId", "templateId") VALUES ('b106245a-99a8-4708-9606-ff416440e795', 'Ol como posso ajudar voc hoje', false, 'e8c7779c-c408-4675-8a81-2ba6ffbfb903', 'dc6e9b49-6b32-4c3f-a419-f12af42d6e6d');
INSERT INTO "Message" ("id", "content", "isFromAgent", "conversationId", "templateId") VALUES ('3d0bace0-d58b-442d-b6f8-8e08e79ac818', 'Por favor envie mais detalhes sobre seu pedido.', true, '522e50ac-32c6-443b-aa56-b81d1aa3fa73', '269c776f-c35c-48a6-8e31-6f5b71a745b9');
INSERT INTO "Message" ("id", "content", "isFromAgent", "conversationId", "templateId") VALUES ('3b6744df-4fed-4878-8154-7f9065dccec5', 'Ol como posso ajudar voc hoje', false, '9b16c71e-95c3-45aa-adf0-83b554f8360f', '4f78e75f-74c4-4500-8650-65c7a02e3e60');
INSERT INTO "Message" ("id", "content", "isFromAgent", "conversationId", "templateId") VALUES ('e2870865-caa5-46d9-a4e0-172eda7cc56c', 'Obrigado por entrar em contato conosco', false, '9b16c71e-95c3-45aa-adf0-83b554f8360f', '4f78e75f-74c4-4500-8650-65c7a02e3e60');
INSERT INTO "Message" ("id", "content", "isFromAgent", "conversationId", "templateId") VALUES ('f7819526-f351-40be-9297-fe68404b2372', 'Seu pedido foi processado com sucesso.', true, '522e50ac-32c6-443b-aa56-b81d1aa3fa73', '6411e27f-cb24-4df9-b220-13f77661cfc1');
INSERT INTO "Message" ("id", "content", "isFromAgent", "conversationId", "templateId") VALUES ('7a60b641-7568-4d28-ae1c-1942fa8b63c0', 'Por favor envie mais detalhes sobre seu pedido.', false, 'd100ca48-8f90-4d0c-a9c4-087255ade2db', '6411e27f-cb24-4df9-b220-13f77661cfc1');
INSERT INTO "Message" ("id", "content", "isFromAgent", "conversationId", "templateId") VALUES ('36d77c9c-5259-48ea-baf5-3260c8adcd59', 'Obrigado por entrar em contato conosco', true, '9b16c71e-95c3-45aa-adf0-83b554f8360f', '43fd365e-f921-4b1f-8263-6e0b23fc9c42');
INSERT INTO "Message" ("id", "content", "isFromAgent", "conversationId", "templateId") VALUES ('5dca69de-a451-496c-8dee-3980a9e86c96', 'Obrigado por entrar em contato conosco', true, 'e8c7779c-c408-4675-8a81-2ba6ffbfb903', '269c776f-c35c-48a6-8e31-6f5b71a745b9');

INSERT INTO "Subscription" ("id", "plan", "status", "currentUsage", "usageLimit", "organizationId") VALUES ('49dd4f75-516e-4b00-a659-3e76bcef29b1', 'Professional', 'active', 504, 433, '1efc1892-b9e8-491c-afe7-ef60f1f27b7e');
INSERT INTO "Subscription" ("id", "plan", "status", "currentUsage", "usageLimit", "organizationId") VALUES ('8dd97588-b24f-423c-8d69-2aa51adc81b8', 'Professional', 'canceled', 152, 430, '89b3c7df-e775-4fa1-8580-57041c313266');
INSERT INTO "Subscription" ("id", "plan", "status", "currentUsage", "usageLimit", "organizationId") VALUES ('5b6922e0-a82c-4d40-a2e7-388b7a90365d', 'Enterprise', 'canceled', 145, 99, '89b3c7df-e775-4fa1-8580-57041c313266');
INSERT INTO "Subscription" ("id", "plan", "status", "currentUsage", "usageLimit", "organizationId") VALUES ('8e65e35d-9203-44ab-a71e-73709f8bfdf4', 'Professional', 'active', 404, 36, 'b391ab79-e6e2-4eb3-be90-16f1d5609a82');
INSERT INTO "Subscription" ("id", "plan", "status", "currentUsage", "usageLimit", "organizationId") VALUES ('82efba51-a7a4-4635-ae80-daf2047df986', 'Starter', 'active', 949, 199, '870fb97b-a1a7-4c88-8351-653c722ee38c');
INSERT INTO "Subscription" ("id", "plan", "status", "currentUsage", "usageLimit", "organizationId") VALUES ('6dccc36a-a64c-4a44-9359-9680c9fa7074', 'Enterprise', 'active', 49, 455, '94ae2b3a-2b5d-4ee8-af69-ad0ec99bb22c');
INSERT INTO "Subscription" ("id", "plan", "status", "currentUsage", "usageLimit", "organizationId") VALUES ('37f9bf47-decb-4c48-916a-2e5462959b4d', 'Enterprise', 'canceled', 615, 904, '89b3c7df-e775-4fa1-8580-57041c313266');
INSERT INTO "Subscription" ("id", "plan", "status", "currentUsage", "usageLimit", "organizationId") VALUES ('0fa4772b-9243-49e6-9171-b3feb93dfd2d', 'Starter', 'active', 670, 863, '94ae2b3a-2b5d-4ee8-af69-ad0ec99bb22c');
INSERT INTO "Subscription" ("id", "plan", "status", "currentUsage", "usageLimit", "organizationId") VALUES ('89432d0a-ceb8-4640-9d62-acd509a59f14', 'Starter', 'pending', 402, 359, '18393817-005f-4b4b-abc7-ce54c64e6fa8');
INSERT INTO "Subscription" ("id", "plan", "status", "currentUsage", "usageLimit", "organizationId") VALUES ('17c81591-d886-452c-8967-55d15d92451c', 'Professional', 'pending', 391, 887, '870fb97b-a1a7-4c88-8351-653c722ee38c');

  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
