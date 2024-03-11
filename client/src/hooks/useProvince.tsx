import addressService from "@/services/addressService";
import { District, Province, Ward } from "@/types/address";
import { useEffect, useState } from "react";

const useProvince = ({
  province,
  district,
}: {
  province?: string;
  district?: string;
}) => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  useEffect(() => {
    addressService.getProvinces().then((data) => {
      setProvinces(data);
    });
  }, []);

  useEffect(() => {
    if (province) {
      const parent_code = provinces.find((p) => p.name === province)?.code;

      if (!parent_code) return;

      addressService.getDistricts(parent_code).then((data) => {
        setDistricts(data);
        setWards([]);
      });
    }
  }, [province, provinces]);

  useEffect(() => {
    if (district) {
      const parent_code = districts.find((d) => d.name === district)?.code;

      if (!parent_code) return;

      addressService.getWards(parent_code).then((data) => setWards(data));
    }
  }, [district, districts]);

  return { provinces, districts, wards };
};

export default useProvince;
