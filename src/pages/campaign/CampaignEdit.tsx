import { useReducer, useEffect, useState } from "react";
import CampaignEditForm from "@/components/campaign/CampaignEditForm";
import {
  campaignReducer,
  initialCampaignCreate,
  type CampaignCreate,
} from "@/types/campaign/create";
import { Box, Paper, Button } from "@mui/material";


const CAMPAIGN_ID = "123"; 

const CampaignEdit = () => {
  const [state, dispatch] = useReducer(
    campaignReducer,
    initialCampaignCreate
  );

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchCampaign = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/campaign/${CAMPAIGN_ID}`);

        if (!response.ok) {
          throw new Error("Failed to fetch campaign");
        }

        const data: CampaignCreate = await response.json();
        dispatch(data);
      } catch (error) {
        console.error("Error fetching campaign:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, []);


  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/campaign/${CAMPAIGN_ID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });

      if (!response.ok) {
        throw new Error("Failed to update campaign");
      }

      alert("Campaign updated successfully");
    } catch (error) {
      console.error("Error updating campaign:", error);
      alert("Failed to update campaign");
    } finally {
      setLoading(false);
    }
  };
  return (
  <Box
    sx={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#000000",
      p: 2,
    }}
  >
    <Paper
      elevation={3}
      sx={{
        p: 4,
        width: "100%",
        maxWidth: 900,
        borderRadius: 3,
      }}
    >
      <h2 style={{ marginBottom: 20 }}>Edit Campaign</h2>

      <CampaignEditForm
        {...state}
        dispatch={dispatch}
        loading={loading}
      />

      <Box
        sx={{
          mt: 3,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </Box>
    </Paper>
  </Box>
);
}
export default CampaignEdit;
