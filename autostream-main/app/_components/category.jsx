import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export const CategorySideBar = () => {
  return (
    <div>
      <div className="border-b border-zinc-300/30">
        <Card className='shadow-none border-none'>
          <CardHeader>
            <CardTitle>Filter Car</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
