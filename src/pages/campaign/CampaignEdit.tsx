import { useReducer, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CampaignEditForm from "@/components/campaign/CampaignEditForm";
import {
  campaignReducer,
  initialCampaignCreate,
  type CampaignCreate,
} from "@/types/campaign/create";
import { Box, Paper, Button, Typography } from "@mui/material";

const CampaignEdit = () => {
  const { campaignId } = useParams<{ campaignId: string }>();

  const [state, dispatch] = useReducer(
    campaignReducer,
    initialCampaignCreate
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!campaignId) return;

    const fetchCampaign = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/campaign/${campaignId}`);

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
  }, [campaignId]);

  const handleSubmit = async () => {
    if (!campaignId) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/campaign/${campaignId}`, {
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

  if (!campaignId) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error">
          Invalid campaign ID
        </Typography>
      </Box>
    );
  }

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
};

export default CampaignEdit;
