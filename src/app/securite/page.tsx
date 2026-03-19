import { PageSection, SectionBanner, NumberedStep, AlertBox, InfoCard } from "@/components/ui";

export default function Page() {
  return (
    <PageSection num={11} title="Securite et prevention des risques">
      <p className="text-dark text-sm">
        La securite de tous est une priorite absolue au sein du CFA. Chaque apprenant(e) doit
        connaitre les consignes de securite et les procedures a suivre en cas d&apos;urgence.
      </p>

      <SectionBanner title="PREVENTION DES RISQUES" color="bg-orange" />
      <InfoCard color="border-orange">
        <p className="text-sm text-dark mb-3">
          En cas de risque ou de danger, suivez les etapes ci-dessous :
        </p>
        <NumberedStep
          num={1}
          title="Alerter"
          description="Prevenir immediatement le formateur present ou tout membre du personnel du CFA."
          color="bg-orange"
        />
        <NumberedStep
          num={2}
          title="Proteger"
          description="Mettre en securite les personnes presentes sans se mettre en danger soi-meme."
          color="bg-orange"
        />
        <NumberedStep
          num={3}
          title="Secourir"
          description="Si vous etes forme(e) aux gestes de premiers secours, portez assistance a la victime."
          color="bg-orange"
        />
        <NumberedStep
          num={4}
          title="Evacuer"
          description="Suivre les consignes d'evacuation, emprunter les sorties de secours et rejoindre le point de rassemblement."
          color="bg-orange"
        />
        <NumberedStep
          num={5}
          title="Signaler"
          description="Remplir une fiche d'incident et la remettre a la direction du CFA dans les plus brefs delais."
          color="bg-orange"
        />
      </InfoCard>

      <AlertBox bg="bg-orange/10" textColor="text-orange">
        Numeros d&apos;urgence : SAMU (15) - Pompiers (18) - Police (17) - Numero europeen (112)
      </AlertBox>

      <SectionBanner title="PROCEDURE EN CAS D'INTRUSION OU DE MENACE" color="bg-red" />
      <InfoCard color="border-red">
        <p className="text-sm text-dark mb-3">
          En cas d&apos;intrusion malveillante ou de menace dans les locaux, appliquez le protocole suivant :
        </p>
        <NumberedStep
          num={1}
          title="S'echapper"
          description="Si la voie est libre et sure, quittez immediatement le batiment par la sortie la plus proche."
          color="bg-red"
        />
        <NumberedStep
          num={2}
          title="Se cacher"
          description="Si l'evacuation n'est pas possible, confinement dans une salle : verrouillez, barricadez, eteignez les lumieres."
          color="bg-red"
        />
        <NumberedStep
          num={3}
          title="Alerter"
          description="Appelez le 17 (police) ou le 112 des que possible, en chuchotant si necessaire."
          color="bg-red"
        />
        <NumberedStep
          num={4}
          title="Se taire"
          description="Mettez votre telephone en silencieux, ne faites aucun bruit et attendez les consignes des forces de l'ordre."
          color="bg-red"
        />
        <NumberedStep
          num={5}
          title="Cooperer"
          description="A l'arrivee des forces de l'ordre, suivez strictement leurs instructions, gardez les mains visibles."
          color="bg-red"
        />
      </InfoCard>

      <AlertBox bg="bg-light" textColor="text-primary">
        Des exercices d&apos;evacuation et de confinement sont organises regulierement.
        La participation de tous est obligatoire. Reperez des a present les issues de secours
        et le point de rassemblement de votre site de formation.
      </AlertBox>
    </PageSection>
  );
}
